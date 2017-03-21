// Rasterização em X
function processScanLine(data, pa, pb, pc, pd){
	// Calcula o gradient nos pontos Y tanto para achar os pontos startX e endX (0 a 1)
	var gradient1 = pa.y != pb.y ? (data.y - pa.y) / (pb.y - pa.y) : 1;
	var gradient2 = pc.y != pd.y ? (data.y - pc.y) / (pd.y - pc.y) : 1;
		
	// Calcula o X inicial e o X final
	var startX = Interpolate(pa.x, pb.x, gradient1);
	var endX = Interpolate(pc.x, pd.x, gradient2);

	// Será usado para o deep buffer
	var startZ = Interpolate(pa.z, pb.z, gradient1);
	var endZ = Interpolate(pc.z, pd.z, gradient2);
	
	// X do UV
	var startU 	= Interpolate(pa.CoordUV.u, pb.CoordUV.u, gradient1);
	var endU 	= Interpolate(pc.CoordUV.u, pd.CoordUV.u, gradient2);
	
	// Y do UV
	var startV 	= Interpolate(pa.CoordUV.v, pb.CoordUV.v, gradient1);
	var endV 	= Interpolate(pc.CoordUV.v, pd.CoordUV.v, gradient2);

	for(var x = startX; x < endX; x++){
		var gradient = (x - startX) / (endX - startX);
		
 		var z = Interpolate(startZ, endZ, gradient);
		var u = Interpolate(startU, endU, gradient);
        var v = Interpolate(startV, endV, gradient);
		
		var _x = Math.abs(parseInt(x) % canvas.width);
		var _y = Math.abs(parseInt(data.y) % canvas.height);
		
		rgba = Map(u, v);
		var z_deep = deepBuffer[_x][_y];
		if(z_deep == 0.0 || z > z_deep){
		 drawPixel(_x, _y, rgba);
		 deepBuffer[_x][_y] = z;
		}
		//drawPixelRect({x:x, y:data.y}, rgbToHex(rgba.r, rgba.g, rgba.b));
	}
};

// Para mais informações, segue o site abaixo ...
// https://www.davrous.com/2013/06/21/tutorial-part-4-learning-how-to-write-a-3d-software-engine-in-c-ts-or-js-rasterization-z-buffering/
function drawTriangle(v1, v2, v3){
	vertices = orderVertices(v1, v2, v3);
	v1 = vertices[0];
	v2 = vertices[1];
	v3 = vertices[2];
	
	// Inverse Slopes
	var dv1v2 = 0;
	var dv1v3 = 0;
	
	// Computing inverse slopes
	var v2_v1 = v2.y - v1.y;
	if(v2_v1 > 0){
		dv1v2 = (v2.x - v1.x) / v2_v1;
	}
	
	var v3_v1 = v3.y - v1.y;
	if(v3_v1 > 0){
		dv1v3 = (v3.x - v1.x) / v3_v1;
	}
	
	// Primeiro caso de triangulo
    // P1 (uv)
    // -
    // -- 
    // - -
    // -  -
    // -   - P2 (uv)
    // -  -
    // - -
    // -
    // P3 (uv)
	if(dv1v2 > dv1v3){
		// Vai de v1.y até v3.y decendo no polygon
		//for(var y = parseInt(v1.y); y < parseInt(v3.y); y++){
		for(var y = parseInt(v1.y); y < parseInt(v3.y); y++){
			// se o y for menor que p2.y, está na parte de baixo do polygon
			if(y < v2.y){
				processScanLine({y:y}, v1, v3, v1, v2);
			}
			// se o y for maior que p2.y, estamos na parte de cima do polygon
			else{
				processScanLine({y:y}, v1, v3, v2, v3);
			}
		}
	}
	// Segundo caso de triangulo
    //            P1 (uv)
    //            -
    //           -- 
    //          - -
    //         -  -
    // (uv )P2 -  - 
    //         -  -
    //          - -
    //           -
    //           P3 (uv)
	else{
		for(var y = parseInt(v1.y); y < parseInt(v3.y); y++){
			if(y < v2.y){
				processScanLine({y:y}, v1, v2, v1, v3);
			}else{
				processScanLine({y:y}, v2, v3, v1, v3);
			}
		}
	}
};

// Mapping U V na textura
function Map(u, v){
	if(texture_data == null){
		return {r:0, g:0, b:0, a:255};
	}
	
	var u = Math.abs(parseInt(u * texture_data.width) % texture_data.width);
	var v = Math.abs(parseInt(v * texture_data.height) % texture_data.height);
	
	var rgba = getPixel(texture_data, parseInt(u), parseInt(v));
	return rgba;
};

function eraseDeepBuffer(){
	for(var x = 0; x < canvas.width; x++){
		for(var y = 0; y < canvas.height; y++){
			deepBuffer[x][y] = 0.0;
		}
	}
}

function draw(content){
	// LIMPA TELA
	content.clearRect(-(canvas.width / 2), -(canvas.height / 2), canvas.width, canvas.height);
	eraseDeepBuffer();
		
	object.draw(content);
		
	// DESENHA UM CIRCULO MOVENDO-SE JUNTO COM O MOUSE
	// canvasCircle(x, y, r, startAngle, endAngle, style, isFill)
	canvasCircle(content, -(canvas.width / 2) + Mouse.x, -(canvas.height / 2) + Mouse.y, 2, 0, 2*Math.PI, "#000000", true);
	
	// EXIBE O FPS NA TELA
	// canvasText(ctx, text, x, y, style, font, align)
	canvasText(content, "FPS " + fps_state, -(canvas.width / 2) + 30, -(canvas.height / 2) + 30, "blue", "12px Arial", "center");
}