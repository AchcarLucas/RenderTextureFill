// Mantém o valor entre 0 e 1
function Clamp(value, min = 0, max = 1){
	return Math.max(min, Math.min(value, max));
};

// Interpola o valor de 2 vertices
// Min é o ponto inicial
// Max é o ponto final
// Gradient é o modulo (%) entre os dois pontos do vertices
function Interpolate(min, max, gradient){
	return min + (max - min) * Clamp(gradient);
};


// Ordena os vetores sempre nessa ordem v1 < v2 < v3
function orderVertices(v1, v2, v3){
	if(v1.y > v2.y){
		var tmp = v2;
		v2 = v1;
		v1 = tmp;
	}
	
	if(v2.y > v3.y){
		var tmp = v2;
		v2 = v3;
		v3 = tmp;
	}
	
	if(v1.y > v2.y){
		var tmp = v2;
		v2 = v1;
		v1 = tmp;
	}
	
	return [v1, v2, v3];
};