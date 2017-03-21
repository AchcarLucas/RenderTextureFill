var canvas 				= null;
var content 			= null;
var fps_controller 		= null;
var fps_range			= null;
var fps_count			= 0;
var fps_state			= 0;

var canvasData			= null;
var deepBuffer			= null;

var halfWidth = 0;
var halfHeight = 0;

var texture				= null;
var texture_data		= null;

var cube 				= null;

var auto_rotation		= false;
var view_mode			= 1;

var pos_x				= 0;
var pos_y				= 0;
var pos_z				= 0;

var scale_x				= 1;
var scale_y				= 1;
var scale_z				= 1;

var rotate_x			= 0;
var rotate_y			= 0;
var rotate_z			= 0;

var wireframe 			= false;

// Fator de escala da tela
var factor 				= 100;
	
var Mouse = {
	x : 0,
	y : 0,
	dragOffset : {
		x : 0,
		y : 0
	},
	drag : false
}