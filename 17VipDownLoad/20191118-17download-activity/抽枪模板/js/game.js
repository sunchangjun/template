var tag = document.querySelectorAll(".tag");
var i = Math.round(Math.random()*16);

document.querySelector("#btn").onclick = function(){
	var count = 1;
	var goround = setInterval(pick, count);	
	document.querySelector("#btn").style.pointerEvents = "none";	
	function pick(){
		if(i==16){
			i=0;
		}
		else{
			if(i == 0){
				tag[i].style.border = "1px solid yellow";
				tag[15].style.border = "1px solid #454545";
				i++;
			}
			else{
				tag[i].style.border = "1px solid yellow";
				tag[i-1].style.border = "1px solid #454545";
				i++;
			}
			
		}
		count +=5;
		clearInterval(goround)
		if( count < Math.round(Math.random()*100+300) ){
			goround = setInterval(pick, count);
		}
		else{
			var text = tag[i - 1].cloneNode(true);
			document.querySelector(".prize").appendChild(text);
			document.querySelector(".prize").style.visibility = "visible";
			document.querySelector("#btn").style.pointerEvents = "auto";
		}

	}
}

document.querySelector(".btn").onclick = function(){
	document.querySelector(".prize").style.visibility = "hidden";
}