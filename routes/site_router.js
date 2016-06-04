//Arquivo modificado. Os arquivos base podem ser encontrados em: https://github.com/IBM-Blockchain/marbles
'use strict';
/* global process */
/*******************************************************************************
 * Copyright (c) 2015 IBM Corp.
 *
 * All rights reserved. 
 *
 * Contributors:
 *   David Huffman - Initial implementation
 *******************************************************************************/
var express = require('express');
var router = express.Router();
var setup = require('../setup.js');

// ============================================================================================================================
// Home
// ============================================================================================================================
router.route('/').get(function(req, res){
	res.redirect('/p1');
});

// ============================================================================================================================
// Part 1
// ============================================================================================================================
router.route('/p1').get(function(req, res){
	res.render('part1', {title: 'CERTIFICADO IFNMG', bag: {setup: setup, e: process.error}} );
});
router.route('/p1/:page?').get(function(req, res){
	res.render('part1', {title: 'CERTIFICADO IFNMG', bag: {setup: setup, e: process.error}} );
});

// ============================================================================================================================
// Part 2
// ============================================================================================================================
router.route('/p2').get(function(req, res){
	res.render('part2', {title: 'CERTIFICADO IFNMG', bag: {setup: setup, e: process.error}} );
});
router.route('/p2/:page?').get(function(req, res){
	res.render('part2', {title: 'CERTIFICADO IFNMG', bag: {setup: setup, e: process.error}} );
});

module.exports = router;