//Arquivo modificado. Os arquivos base podem ser encontrados em: https://github.com/IBM-Blockchain/marbles
/* global $, document, formatDate, nDig, atob */
/* exported clear_blocks, new_block */
var block = 0;
var blocks = [];

$(document).on('ready', function() {
	setInterval(function(){
		move_on_down();
	}, 2000);

	var clicked = false;
	$(document).on('click', '.block', function(event){
		clicked = !clicked;
		show_details(event, Number($(this).html()));
	});

	$(document).on('mouseover', '.block', function(event){
		show_details(event, Number($(this).html()));
	});
	
	$(document).on('mouseleave', '#blockWrap', function(){
		if(!clicked) $('#details').fadeOut();
	});
});

function show_details(event, id){								//build the block details html
	var left = event.pageX - $('#details').parent().offset().left - 50;
	if(left < 0) left = 0;
	var ccid = formatCCID(blocks[id].blockstats.transactions[0].type, blocks[id].blockstats.transactions[0].uuid, atob(blocks[id].blockstats.transactions[0].chaincodeID));
	var payload = atob(blocks[id].blockstats.transactions[0].payload);

	var html = '<p class="blckLegend"> Número do Registro: ' + blocks[id].id + '</p>';
	html += '<hr class="line"/><p>Data da Transação: &nbsp;' + formatDate(blocks[id].blockstats.transactions[0].timestamp.seconds * 1000, '%M-%d-%Y %I:%m%p') + ' UTC</p>';
	html += '<p> ID da Transação: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + formatUUID(blocks[id].blockstats.transactions[0].type, blocks[id].blockstats.transactions[0].uuid) + '</p>';
	html += '<p> Tipo:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + formatType(blocks[id].blockstats.transactions[0].type) + '</p>';
	html += '<p> Dados do Certificado:  &nbsp;' + formatPayload(payload, ccid) + '</p>';
	$('#details').html(html).css('left', left).fadeIn();
}



function new_block(newblck){									//rec a new block
	if(!blocks[Number(newblck.id)]){
		for(var last in blocks);								//find the id of the last known block
		if(!last) last = 0;
		last++;
		//console.log('last', last, Number(newblck.id));
		if(block > 0){											//never fake blocks on an initial load
			for(var i=last; i < Number(newblck.id); i++){		//build fake blocks for ones we missed out on
				console.log('run?');
				blocks[Number(i)] = newblck;
				
				
				build_block(i);
			}
		}
		blocks[Number(newblck.id)] = newblck;
		build_block(newblck.id);								//build block
	}
}

function build_block(id){										//build and append the block html
	$('#blockWrap').append('<div class="block">' +  nDig(id, 4) + '</div>');
	$('.block:last').animate({opacity: 1, left: (block * 36)}, 600, function(){
		$('.lastblock').removeClass('lastblock');
		$('.block:last').addClass('lastblock');
	});
	
	//Código inserido para remoção de transação do tipo Deploy
	if (formatType(blocks[id].blockstats.transactions[0].type==1))
	
	{
		$('.block:last').remove();
		block--;
		}
	
	block++;
}





function move_on_down(){										//move the blocks left
	if(block > 10){
		$('.block:first').animate({opacity: 0}, 800, function(){$('.block:first').remove();});
		$('.block').animate({left: '-=36'}, 800, function(){});
		block--;
	}
}

function clear_blocks(){										//empty blocks
	block = 0;
	blocks = [];
	$('.block').remove();
}


function formatCCID(i, uuid, ccid){								//flip uuid and ccid if deploy, weird i know
	if(i == 1) return uuid;
	return ccid;
}

function formatUUID(i, uuid){									//blank uuid if deploy, its just ccid again
	if(i == 1) return '-';
	return uuid;
}

function formatType(i){											//spell out deploy or invoke
	if(i == 1) return 'deploy';
	if(i == 2) return 'Certificado';
	return i;
}

function formatPayload(str, ccid){								//create a sllliiiggghhhtttlllllyyy better payload name from decoded payload
	var func = ['init', 'delete', 'write', 'IFNMG', 'set_user', 'open_trade', 'perform_trade', 'remove_trade'];
	str =  str.substring(str.indexOf(ccid) + ccid.length + 4);
	for(var i in func){
		if(str.indexOf(func[i]) >= 0){
			return func[i] + ': ' + str.substr(func[i].length);
		}
	}
	return str;
}

