var Deg2Rad = (math.PI / 180);
var time = 0;

function update(content){
	object.identity();
	
	object.scale(scale_x, scale_y, scale_z);
	
	var x = 0.0;
	var y = 0.0;
	var z = 0.0;
	if(auto_rotation){
		time = (time  + 1) % 360;
		x = time;
		y = time;
		z = time;
	}else{
		x = rotate_x;
		y = rotate_y;
		z = rotate_z;
	}
	
	object.rotate(x + 0.001, y + 0.001, z);

	object.position(pos_x, pos_y, pos_z);
	
	if(view_mode == 1){
		object.perspectiva();
	}else if(view_mode == 0){
		object.orthographic();
	}
}