// with design
// global variables
var staff = [];
var fStaff = [];
var idSel = [];
var selPost = [];
var selPart = [];
var postpart = ['',''];
var postVal = 0;
var partVal = 0;
var labelLength = 0;
var staffLength = 0;
var tempPost = 0;
var tempPart = 0;
var addf = '';
var postText = '';
var partText = '';
var postId = '';
var partId = '';
var post = [''];
var part = [''];



$(document).click(function() {
    if ( $("#search").is(':focus') ) {
		$('.input-search').addClass("border-focus");
	}
	else {
		$('.input-search').removeClass("border-focus");
	}
});

$(document).bind('click', function(e) {
    var $clicked = $(e.target);
    if (! $clicked.parents().hasClass("dropdown"))
        $(".dropdown dd ul").hide();
});

// functions
function getData(callback) {

	$.ajax ({
		type: "Post",
		url: "php/getAllData.php",
		dataType: 'json',

		success: function(response){
			callback(response);
		},
		error: function(response){
			// do something
		}
	});
}

function callback(response){

	$.each(response, function(i, data) {
		staff.push(data);
		fStaff.push(data);
    });
	appendStaff();

	return staff;
}

function entry() {
	$('.container').html('');
	$('.container').append('\
		<div class="filter-container">\
			<div class="input-search-containter">\
				<div class="input-search">\
					<label for="search">\
						<i class="fa fa-search searchIcon" aria-hidden="true"></i>\
					</label>\
					<input type="text" id="search" placeholder="Search">\
					<span class="spanResult"></span>\
					<span class="clearSearch"></span>\
				</div>\
				<div class="position-container">\
					<div class="addfilter-containter">\
						Add Filter\
					</div>\
				</div>\
			</div>\
			<div class="search-container">\
				<div class="searchOutput"></div>\
			</div>\
		<div>\
	');

	getData(callback);
	keyup();
	addFilter();
}

function fillPopup() {
	$('.popup-container').append('\
		<div class="popup">\
			<span class="closePopup">&times;</span>\
			<ul class="ulMain">\
				<li class="post"><a>POST</a>\
					<hr>\
					<ul class="ulPost">\
						<li class="0" id="一般">一般</li>\
						<li class="0" id="役員">役員</li>\
						<li class="0" id="部長">部長</li>\
						<li class="0" id="課長">課長</li>\
						<li class="0" id="主任">主任</li>\
					</ul>\
				</li>\
				<li class="part"><a>PART</a>\
					<hr>\
					<ul class="ulPart">\
						<li class="0" id="その他">その他</li>\
						<li class="0" id="事業制作部">事業制作部</li>\
						<li class="0" id="事業開発部">事業開発部</li>\
						<li class="0" id="事業推進営業部">事業推進営業部</li>\
					</ul>\
				</li>\
			</ul>\
			<div class="buttonOk"> OK </div>\
		</div>\
	');
}

function appendStaff() {
	$('.searchOutput').html('');

	var idSellength = idSel.length;

	$.each( staff, function( index , data ) {

		appended(data);
		
		if ( idSellength != 0 ){
			loop(data);
		}
	});

	check();
}

function addFilter() {

	$(".position-container").click(function() {
			$('.addfilter-containter').addClass("addfilter-focus");
			$('.popup-container').addClass('active');
	});

	addPopup();
}

function eachPostLi(){
	$('.ulPost li').each(function() {
	    if ( $(this).attr('class') == '1' ) {
	     	$(this).html('');
	     	$(this).html($(this).attr('id'));
	     	$(this).removeClass('1');
			$(this).addClass('0');
	    }
	});
}

function eachPartLi(){
	$('.ulPart li').each(function() {
		if ( $(this).attr('class') == '1' ) {
			$(this).html('');
	     	$(this).html($(this).attr('id'));
	     	$(this).removeClass('1');
			$(this).addClass('0');
		}
	});
}

function addPopup(){
	fillPopup();

	console.log(post);
	console.log(part);

	$(".ulPost li").click(function() {
		postId = $(this).attr('id');
		postText = $(this).html();

		if ( postId == postText ) {
			$('.ulPost #'+postId).removeClass('0');
			$('.ulPost #'+postId).addClass('1');
			$('.ulPost #'+postId).html('<span class="nSpan">'+postId+'</span><i class="fa fa-check" aria-hidden="true"></i>');
		}
		else {
			$('.ulPost #'+postId).removeClass('1');
			$('.ulPost #'+postId).addClass('0');
			$('.ulPost #'+postId).html(postId);
		}

	});

	$(".ulPart li").click(function() {
		partId = $(this).attr('id');
		partText = $(this).html();

		if ( partId == partText ) {
			$('.ulPart #'+partId).removeClass('0');
			$('.ulPart #'+partId).addClass('1');
			$('.ulPart #'+partId).html('<span class="nSpan">'+partId+'</span><i class="fa fa-check" aria-hidden="true"></i>');
		}
		else {
			$('.ulPart #'+partId).removeClass('1');
			$('.ulPart #'+partId).addClass('0');
			$('.ulPart #'+partId).html(partId);
		}
		
	});

	$(".buttonOk").click(function() {
		$('.popup-container').removeClass('active');
		$('.addfilter-containter').removeClass("addfilter-focus");
		select3();
	});

	$('.closePopup').click(function() {
		$('.popup-container').removeClass('active');
		$('.addfilter-containter').removeClass("addfilter-focus");
		dataStore();
	});
}

function dataStore() {

	eachPostLi();
	eachPartLi();

	// POST
	if ( post.length !=0 || post != '' ) {
		for ( i=0; i<post.length; i++ ) {
			$('.ulPost #'+post[i]).removeClass('0');
			$('.ulPost #'+post[i]).addClass('1');
			$('.ulPost #'+post[i]).html('<span class="nSpan">'+post[i]+'</span><i class="fa fa-check" aria-hidden="true"></i>');
		}
	}

	// PART
	if ( part.length !=0 || part != '' ) {
		for ( i=0; i<part.length; i++ ) {
			console.log(part[i]);
			$('.ulPart #'+part[i]).removeClass('0');
			$('.ulPart #'+part[i]).addClass('1');
			$('.ulPart #'+part[i]).html('<span class="nSpan">'+part[i]+'</span><i class="fa fa-check" aria-hidden="true"></i>');
		}
	}
}

function select3() {
	var postcount = 0;
	var partcount = 0;
	var postsel = '';
	var partsel = '';

	post = [];
	part = [];

	postpart = [];

	$('.ulPost li').each(function() {
	    if ( $(this).attr('class') == '1' ) {
	    	postsel = $(this).attr('id');
	    	post.push(postsel);
	     	postcount ++;
	    }
	});

	$('.ulPart li').each(function() {	
		if ( $(this).attr('class') == '1' ) {
			partsel = $(this).attr('id');
			part.push(partsel);
			partcount ++;
		}
	});

	$('.searchOutput').html('');

	if ( post.length != 0 && part.length !=0 ){
		console.log(post);
		console.log(part);
		var count = 0;
		fStaff = [];
		$.each( staff, function( index , data ) {
			for ( i=0; i<post.length; i++ ){
				for ( j=0; j<part.length; j++ ) {
					if ( data.post_name == post[i] && data.part_name == part[j] ) {
						fStaff.push(data);
						appended(data);
						loop(data);
						count++;
					}
				}
			}
		});
		console.log(count);
		check();
	}

	else if ( post.length != 0 ) {
		fStaff = [];
		for ( i=0; i<post.length; i++ ){
			$.each( staff, function( index , data ) {
				if ( data.post_name == post[i] ) {
					fStaff.push(data);
					appended(data);
					loop(data);
				}
			});
		}
		check();
	}

	else if ( part.length !=0 ) {
		fStaff = [];
		for ( i=0; i<part.length; i++ ){
			$.each( staff, function( index , data ) {
				if ( data.part_name == part[i] ) {
					fStaff.push(data);
					appended(data);
					loop(data);
				}
			});
		}
		check();
	}
	else {
		appendStaff();
	}
}

function keyup() {

	var search = $('#search');

	search.keyup(function () {
		var input = search.val();
		searchKeyup(input);
	});

	$('.clearSearch').click(function() {
		$('.spanResult').html('');
		$('.clearSearch').html('');
		search.val('').focus();

		var input = search.val();
		searchKeyup(input);
	});
}

function searchKeyup(input) {

	var count = 0;

	console.log(input);

	$('.searchOutput').html('');

	console.log(post);
	console.log(part);

	//ver3
	if ( post.length == 0 && part.length == 0 || post == '' && part == '') {

		$.each( staff, function( index , data ) {

			var lowercase = data.name.toLowerCase();
			input = input.toLowerCase();

			if ( lowercase.indexOf(input) > -1 ) {
				appended(data);
				loop(data);
				count++;
			}
		});
		
	}
	else {
		$.each( fStaff, function( index , data ) {

			var lowercase = data.name.toLowerCase();
			input = input.toLowerCase();

			if ( lowercase.indexOf(input) > -1 ) {
				appended(data);
				loop(data);
				count++;
			}
		});
	}

	if ( input == '') {
		$('.spanResult').html('');
		$('.clearSearch').html('');
	}
	else {
		$('.spanResult').html('');
		$('.spanResult').html(count);
		$('.clearSearch').html('&times;');
	}

	if ( count == 0 ) {
		$('.searchOutput').append('<div class="noResult">No Result Found</div>');
	}

	check();
}

function checkLength() {
	labelLength = $('.labelOutput').length;
	staffLength = staff.length;
}

function appended(data) {
	$('.searchOutput').append('<label class="labelOutput" id="l'+data.id+'" for="name'+data.id+'"><span>'+data.name+'</span></label>\
						<input type="checkbox" class="listCheck" id="name'+data.id+'" value="'+data.id+'">');
}

function loop(data) {
	$.each( idSel, function( index , data_id) {
		if ( data_id == data.id) {
			if ( !( $('#name'+data.id).is(":checked") ) ) {
				$('#name'+data.id).attr("checked", "checked");
				$('#l'+data.id).addClass('l'+data.id+' staffSelect');
			}
		}
	});
}

function check() {

	$.each( staff, function( index , data ) {
		$('#name'+data.id).change(function(){	
			if ( $('#name'+data.id).is(":checked") ) {
				this.setAttribute("checked", "checked");
				$('#l'+data.id).addClass('l'+data.id+' staffSelect');
				idSel.push(data.id);
				console.log(idSel);
			}
			else {
				this.removeAttribute('checked');
				$('#l'+data.id).removeClass('l'+data.id+' staffSelect');
				idSel = jQuery.grep(idSel, function(value) {
					return value != data.id;
				});
				console.log(idSel);
			}
			// getDataSel();
		});
	});
	
}

// var dataSel = [];
// function getDataSel() {
// 	$.each( staff, function( index , data) {
// 		$.each( idSel, function( index , data_id) {
// 			if ( data_id == data.id) {
// 				dataSel.push({id:data.id, name:data.name, bday:data.bday});
// 			}
// 		});
// 	});
// 	console.log(dataSel);
// }








