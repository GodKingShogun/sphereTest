$(function () {
let cancelTime = document.getElementById('cancelTime');	
let addTime = document.getElementById('addTime');
let menu = document.getElementById('myMenu');
let valueArray = [];


//listen for touch device
window.addEventListener('touchstart', function() {
$('div.time.checkbox').click(function() {
let allCells = $('.time');
let touchedCell = allCells.index($(this));
let touchedCellNumber;
let touchedCellNumberEnd;


let from = document.getElementById('from');
let to = document.getElementById('to');
let ampm = document.getElementById('ampm');
let ampm2 = document.getElementById('ampm2');
	
// get column that was touched
let checkTouchedCell = () => {
if (touchedCell<=47) {
	touchedCellNumber = 0;
	touchedCellNumberEnd = 47;
} else if (touchedCell<=95) {
	touchedCellNumber = 48;
	touchedCellNumberEnd = 95;
} else if (touchedCell<=143) {
	touchedCellNumber = 96;
	touchedCellNumberEnd = 143;	
} else if (touchedCell<=191) {
	touchedCellNumber = 144;
	touchedCellNumberEnd = 191;	
} else if (touchedCell<=239) {
	touchedCellNumber = 192;
	touchedCellNumberEnd = 239;	
} else if (touchedCell<=287) {
	touchedCellNumber = 240;
	touchedCellNumberEnd = 287;	
} else if (touchedCell<= 335) {
	touchedCellNumber = 288;
	touchedCellNumberEnd = 335;	
}
	}

//set up popup menu select options and buttons
let setSelectTime = () => {
  let timeArray = ['12:00','12:30','1:00','1:30','2:00','2:30','3:00',
								'3:30','4:00','4:30','5:00','5:30','6:00','6:30','7:00',
								'7:30','8:00','8:30','9:00','9:30','10:00','10:30',
								'11:00','11:30'];
	checkTouchedCell();
	let touchedCellNumberCopy = touchedCellNumber;
	$(from).children().remove();
	$(to).children().remove();
  $(ampm).children().remove();
	$(ampm2).children().remove();
	for (let i=0; i<timeArray.length; i++) {
		if (i===0) {
	$(from).append(`<option value=${touchedCellNumberCopy} selected>${timeArray[i]}<option>`);
	$(to).append(`<option value=${touchedCellNumberCopy} selected>${timeArray[i]}<option>`);	
		} else {
	$(from).append(`<option value=${touchedCellNumberCopy}>${timeArray[i]}<option>`);
	$(to).append(`<option value=${touchedCellNumberCopy}>${timeArray[i]}<option>`);
		}
			touchedCellNumberCopy++;
	}
	$(ampm).append(`<option value=am selected>AM<option>`);
  $(ampm).append(`<option value=pm>PM<option>`);
	$(ampm2).append(`<option value=am selected>AM<option>`);
  $(ampm2).append(`<option value=pm>PM<option>`);	
	
	$('select option').filter(function() {
		return !this.value || $.trim(this.value).length === 0 || $.trim(this.text).length === 0;
	}).remove();
  
	menu.style.display = "block";
};
	setSelectTime();

	// calculation for selected range of time
 $(addTime).click(function () {
	 valueArray = [];
	let fromValue =  parseInt($('#from').val()); 
	let toValue = parseInt($('#to').val());
	let ampmValue = $('#ampm').val();
	let ampm2Value =  $('#ampm2').val();

	switch (ampmValue) {
		case 'am':
		fromValue = fromValue;
		break;
		case 'pm':
		fromValue+=24;
		break;
	}
	
		switch (ampm2Value) {
		case 'am':
		toValue = toValue;
		break;
		case 'pm':
		toValue+=24;
		break;
	}

	if (fromValue === toValue) {
		for (let i=touchedCellNumber; i<=touchedCellNumber+47; i++) {
			valueArray.push(i);
		}
	} else {
		let stopLoop = true;
		let fromValueCopy = fromValue;
	while (stopLoop) {
		if (fromValueCopy === toValue) {
			valueArray.push(fromValueCopy);
			stopLoop = false;
		} else if (fromValueCopy<touchedCellNumberEnd) {
			valueArray.push(fromValueCopy);
		} else if (fromValueCopy>touchedCellNumberEnd) {
			fromValueCopy = touchedCellNumber;
			valueArray.push(fromValueCopy);
		}

		fromValueCopy++;
		}
	}
});	

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == menu) {
//         menu.style.display = "none";
				
//     }
// }
});
});
	
	
	$('.time')
	.mousedown(rangeMouseDown)
	.mouseup(rangeMouseUp)
	.mousemove(rangeMouseMove);

var dragStart = 0;
var dragEnd = 0;
var isDragging = false;
var arr1 = []; // all check boxes
var arr2 = []; // current check boxes
var flag = 0; //indicate drag up or down, if(flag==1) up; if(flag==2) down

function rangeMouseDown(e) {
	//check if it's right button of the mouse click
	if (isRightClick(e)) {
		return false;
	} else {
		var allCells = $(".time");
		dragStart = allCells.index($(this));
		isDragging = true;
		if (typeof e.preventDefault != 'undefined') { e.preventDefault(); } 
		document.documentElement.onselectstart = function () { return false; };
	} 
}

function rangeMouseUp(e) {
	//check if it's right button of the mouse click
	if (isRightClick(e)) {
		return false;
	} else {
		var allCells = $(".time");
		//to check if it's only click
		dragEnd = allCells.index($(this));
		if($.inArray(dragEnd,arr2) == -1){
		arr2.push(dragEnd);
		}
		arr1 = arr1.concat(arr2);
		arr1 = $.unique(arr1);
		
	 window.addEventListener('touchstart', function() {
		$(addTime).click(function () {
		arr2.shift();
		arr2 = arr2.concat(valueArray);
		arr1 = arr1.concat(arr2);
		arr1 = $.unique(arr1);
		for(var i = 0; i < arr1.length; i++){
			$(".time").eq(arr1[i]).find(':checkbox').prop('checked', true);
		}
		
		valueArray = [];
	  menu.style.display = "none";
			}); 
		 
$(cancelTime).click(function () {
	valueArray = [];
	menu.style.display = 'none'
});
		});
		
		for(var i = 0; i < arr1.length; i++){
			$(".time").eq(arr1[i]).find(':checkbox').prop('checked', true);
		}
		if(dragStart == dragEnd){
			$(".time").eq(dragStart).find(':checkbox').prop('checked', false);
		}
		//alert(arr1.length);
		
		isDragging = false;
		dragStart = 0;
		dragEnd = 0;
		arr2 = [];
			//selectRange();
	}
	document.documentElement.onselectstart = function () { return true; }; 
	
}

function rangeMouseMove(e) {
	if (isDragging) {
		var allCells = $(".time");
		dragEnd = allCells.index($(this));
		
		if(dragStart < dragEnd){
			if(flag == 1){
				for(var i = 0; i < arr2.length; i++){
					$(".time").eq(arr2[i]).find(':checkbox').prop('checked', false);
				}
				arr2 = [];
			}
			flag = 2;
			//drag back
			if($.inArray(dragEnd,arr2) != -1){
				var len = arr2.length;
				var last = arr2[len-1];
				if(dragEnd < last){
					$(".time").slice(dragEnd, last+1).find(':checkbox').prop('checked', false);
					for(var i = 0; i < last-dragEnd; i++){
						arr2.pop();
					}
				}
				//in case for drag down, then left, then right
				//else if (dragEnd > last){
				//	$(".time").slice(last, dragStart).find(':checkbox').prop('checked', false);
				//	for(var i = 0; i < dragStart-last; i++){
				//		arr2.pop();
				//	}
				//}
			}
			//drag extend
			else{
				for(var i = dragStart; i <= dragEnd; i++){
					if($.inArray(i,arr2) == -1)
						arr2.push(i);
				}
			}
			selectRange();
		}else if(dragStart > dragEnd){
			if(flag == 2){
				for(var i = 0; i < arr2.length; i++){
					$(".time").eq(arr2[i]).find(':checkbox').prop('checked', false);
				}
				arr2 = [];
			}
			flag = 1;
			//drag back
			if($.inArray(dragEnd,arr2) != -1){
				var len = arr2.length;
				var last = arr2[len-1];
				if(dragEnd > last){
					
					$(".time").slice(last, dragEnd+1).find(':checkbox').prop('checked', false);
					for(var i = 0; i < dragEnd-last; i++){
						arr2.pop();
					}
				}
				//in case for drag up, then right, then left
				//else{
					//alert("x");
				//	$(".time").slice(dragStart+1, last+1).find(':checkbox').prop('checked', false);
				//	for(var i = 0; i < dragStart-last; i++){
				//		arr2.pop();
				//	}
				//}
			}
			//drag extend
			else{
				for(var i = dragStart; i >= dragEnd; i--){
					if($.inArray(i,arr2) == -1)
						arr2.push(i);
				}
			}
			selectRange();
		}else{
			//drag back
			if($.inArray(dragEnd,arr2) != -1){
				var len = arr2.length;
				var last = arr2[len-1];
				if(dragEnd < last){
					$(".time").slice(dragEnd, last+1).find(':checkbox').prop('checked', false);
					for(var i = 0; i < last-dragEnd; i++){
						arr2.pop();
					}
				}else{
					$(".time").slice(last, dragEnd+1).find(':checkbox').prop('checked', false);
					for(var i = 0; i < dragEnd-last; i++){
						arr2.pop();
					}
				}
				$(".time").eq(dragEnd).find(':checkbox').prop('checked', false);
			}
			//drag extend
			else{
				if($.inArray(dragStart,arr2) == -1){
					arr2.push(dragStart);
				}
			}
		}
	}						
}

function selectRange() {
	//merge arr1 with arr2 and set checked to true
	var arr3 = arr1.concat(arr2);
	arr3 = $.unique(arr3);
	for(var i = 0; i < arr3.length; i++){
		$(".time").eq(arr3[i]).find(':checkbox').prop('checked', true);
	}
}

function isRightClick(e) {
	if (e.which) {
		return (e.which == 3);
	} else if (e.button) {
		return (e.button == 2);
	}
	return false;
}
});