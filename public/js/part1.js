//Arquivo modificado. Os arquivos base podem ser encontrados em: https://github.com/IBM-Blockchain/marbles

/* global new_block,formatDate, randStr, bag, $, clear_blocks, document, WebSocket, escapeHtml, window */
var ws = {};


// =================================================================================
// On Load
// =================================================================================
$(document).on('ready', function() {
	connect_to_server();
	
	
	// =================================================================================
	// jQuery UI Events
	// =================================================================================
	$('#submit').click(function(){
		console.log('creating marble');
		
		var obj = 	{
						type: 'create',
						cpf: $('input[name="cpf"]').val().replace('', ' | '),
						nome: $('input[name="nome"]').val().replace('', ' | '),
						curso: $('select[name="curso"]').val().replace('', ' | '),
						user: $('input[name="user"]').val().replace('', ' | '),
						v: 1
					};
		if(obj.user!=' | ' && obj.cpf!=' | ' && obj.nome!=' | ' && obj.user!='dd/mm/aaaa'){
			console.log('creating marble, sending', obj);
			ws.send(JSON.stringify(obj));
			showHomePanel();
			
		}
		return false;
	});
	
	$('#homeLink').click(function(){
		showHomePanel();
	});

	$('#createLink').click(function(){
		
	});

	
	
	
	
	//drag and drop marble
	$('#user2wrap, #user1wrap, #trashbin').sortable({connectWith: '.sortable'}).disableSelection();
	$('#user2wrap').droppable({drop:
		function( event, ui ) {
			var user = $(ui.draggable).attr('user');
			if(user.toLowerCase() != bag.setup.USER2){
				$(ui.draggable).addClass('invalid');
				transfer($(ui.draggable).attr('id'), bag.setup.USER2);
			}
		}
	});
	$('#user1wrap').droppable({drop:
		function( event, ui ) {
			var user = $(ui.draggable).attr('user');
			if(user.toLowerCase() != bag.setup.USER1){
				$(ui.draggable).addClass('invalid');
				transfer($(ui.draggable).attr('id'), bag.setup.USER1);
			}
		}
	});
	
	
	
	// =================================================================================
	// Helper Fun
	// ================================================================================
	//show admin panel page
	function showHomePanel(){
		$('#homePanel').fadeIn(300);
		$('#createPanel').hide();
		
		var part = window.location.pathname.substring(0,3);
		window.history.pushState({},'', part + '/home');						//put it in url so we can f5
		
		console.log('getting new balls');
		setTimeout(function(){
			$('#user1wrap').html('');											//reset the panel
			$('#user2wrap').html('');
			ws.send(JSON.stringify({type: 'get', v: 1}));						//need to wait a bit
			ws.send(JSON.stringify({type: 'chainstats', v: 1}));
		}, 1000);
	}
	
	
});


// =================================================================================
// Socket Stuff
// =================================================================================
function connect_to_server(){
	var connected = false;
	connect();
	
	function connect(){
		var wsUri = 'ws://' + document.location.hostname + ':' + document.location.port;
		console.log('Connectiong to websocket', wsUri);
		
		ws = new WebSocket(wsUri);
		ws.onopen = function(evt) { onOpen(evt); };
		ws.onclose = function(evt) { onClose(evt); };
		ws.onmessage = function(evt) { onMessage(evt); };
		ws.onerror = function(evt) { onError(evt); };
	}
	
	function onOpen(evt){
		console.log('WS CONNECTED');
		connected = true;
		clear_blocks();
		$('#errorNotificationPanel').fadeOut();
		ws.send(JSON.stringify({type: 'get', v:1}));
		ws.send(JSON.stringify({type: 'chainstats', v:1}));
	}

	function onClose(evt){
		console.log('WS DISCONNECTED', evt);
		connected = false;
		setTimeout(function(){ connect(); }, 5000);					//try again one more time, server restarts are quick
	}

	function onMessage(msg){
		try{
			var data = JSON.parse(msg.data);
			if(data.v != '3'){
				console.log('rec', data.msg, data);
				if(data.marble){
					build_ball(data.marble);
				}
				else if(data.msg === 'chainstats'){
					
					$('#blockdate').html('<span style="color:#fff">INSTITUTO FEDERAL DO NORTE DE MINAS GERAIS</span>&nbsp;&nbsp;');
					var temp = { 
									id: data.blockstats.height, 
									blockstats: data.blockstats
								};
					new_block(temp);								//send to blockchain.js
				}
			}
		}
		catch(e){
			console.log('ERROR', e);
		}
	}

	function onError(evt){
		console.log('ERROR ', evt);
		if(!connected && bag.e == null){											
			$('#errorName').html('ATENÇÃO!!!');
			$('#errorNoticeText').html('Aguarde até que o servidor node se conecte ao blockchain!');
			$('#errorNoticeText').append('Verifique os logs do servidor se esta mensagem não desaparecer em 1 minuto!');
			$('#errorNotificationPanel').fadeIn();
		}
	}
}


