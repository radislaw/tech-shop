//***************************Accordeon toggle************************
var accordeonToggle = (function() {

	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){
		$('.accordeon__trigger').on('click', _itemToggle);
		_viewArrow();
		_disableSelection();
	};

	var _itemToggle = function(){
		var $this = $(this);

		$this.toggleClass('hide-margin');
		$this.toggleClass('show-widget');

		var _accordeonItem = $this.closest('.accordeon__item');
		var _accordeonHide = _accordeonItem.find('.accordeon__item__toggle');


		_accordeonHide.stop(true).queue('fx',
			function(){
				$(this).slideToggle().dequeue('fx');
			})
	};

	var _viewArrow = function(){
		var _accordeonHide = $('.accordeon__item__toggle');

		_accordeonHide.each(function(){
			var $this = $(this);
			var currentTrigger = $this
									.closest('.accordeon__item')
									.find('.accordeon__trigger');

			if($this.is(':visible')) {
				currentTrigger
					.removeClass('show-widget')
					.addClass('hide-widget')
			} else {
				currentTrigger
					.removeClass('hide-widget')
					.addClass('show-widget')
			}
		});

	};

	var _disableSelection = function(){
		$('.accordeon__trigger').disableSelection();
		$('.list-params__label').disableSelection();
	};

	return {
		init: init
	};

})();

accordeonToggle.init();
//*******************************************************************

// **********************Rest filters********************************
var resetFilter = (function(){

	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){
		$('.reset-filter')
			.on('click', _reset)
			.disableSelection();
	};


	var _reset = function(e){

		e.preventDefault();

		var $this = $(this);

		var _accordeonItem = $this.closest('.accordeon__item__toggle');
		var _input = _accordeonItem.find('input');

		_input.each(function(){
			$(this).prop('checked', false);
		})

	};

	return {
		init: init
	};

})();

resetFilter.init();
//*******************************************************************


//************************ColorPicker*********************************

var setColorPicker = (function(){
	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){
		_setColor();
	};

	var _setColor = function(){

		var colorPick = $('.colorpicker__link');

		colorPick.each(function(){

			var $this = $(this);

			var color = $this.attr('data-color');

			$this.css('background', color);
		});



	};

	return {
		init: init
	};
})();

setColorPicker.init();
//*******************************************************************

//*************************rangePrice********************************
var rangePrice = (function(){
	var init = function(){
		_setUpListners();
	};



	var _setUpListners = function(){
		_changePrice();
	};

	var inputStart = $('.range-slider__field_start').find('.range-slider__input');
	var inputEnd = $('.range-slider__field_end').find('.range-slider__input');
	var sliderInterval = $('.range-slider__interval');

	var startRange = parseInt(inputStart.attr('value'));
	var endRange = parseInt(inputEnd.attr('value'));

	var _changePrice = function(){
		sliderInterval.slider({
			range: true,
			step: 50,
			min: startRange,
			max: endRange,
			values: [startRange, endRange],
			slide: function(event, ui) {
				inputStart.val(ui.values[0]);
				inputEnd.val(ui.values[1]);
			}
		});

		inputStart.change(function(){
			var $this = $(this);
			sliderInterval.slider('values', 0, $this.val());
		});

		inputEnd.change(function(){
			var $this = $(this);
			sliderInterval.slider('values', 1, $this.val());
		});

	};



	return {
		init: init
	};
})();

rangePrice.init();
//*******************************************************************

//********************Change view************************************

var changeView = (function(){
	var init = function(){
		_setUpListners();
	};


	var _setUpListners = function(){
		$('.view-list__link').on('click', _addClass);
		_setDefaultView();
	};

	var _setDefaultView = function(){
		$('.view-list__item_detailed')
			.closest('.view-list__item')
			.addClass('active');
	};

	var _addClass = function(e){
		e.preventDefault();

		var $this = $(this);

		var cardProduct = $('.card-product');

		var viewItem = $this.closest('.view-list__item');

		if(viewItem.hasClass('view-list__item_detailed')){
			viewItem.addClass('active');
			$('.view-list__item').not(viewItem).removeClass('active');

			cardProduct.each( function(){
				$(this).removeClass('card-product_tile-view card-product_list-view');
			} )
		}else if(viewItem.hasClass('view-list__item_tile')){
			viewItem.addClass('active');
			$('.view-list__item').not(viewItem).removeClass('active');

			cardProduct.each( function(){
				$(this).removeClass('card-product_list-view')
					.addClass('card-product_tile-view');
			} )
		} else if(viewItem.hasClass('view-list__item_list')){
			viewItem.addClass('active');
			$('.view-list__item').not(viewItem).removeClass('active');

			var descriptionText = $('.description-product__text');

			descriptionText.each(function(){
				var $this = $(this);
				var newText = $this.text().substr(0, 38) + '...';
				$this.text(newText);
			});

			cardProduct.each( function(){
				$(this).removeClass('card-product_tile-view')
					.addClass('card-product_list-view');
			} )
		}

		var _cutDescription = function() {
			$('description-product__text').each(function(){
			})
		};
		_cutDescription();
	};



	return {
		init: init
	};
})();

changeView.init();
//*******************************************************************

//********************setColumn**************************************
var setColumn = (function(){
	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){
		_setCol();
	};

	var _setCol = function(){
		$('.important-info__inner').columnize({
			width: 530
		})
	};

	return {
		init: init
	};
})();

setColumn.init();
//*******************************************************************

//**********************sliderPoster*********************************
var sliderPoster = (function(){

	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){
		_setDefaultPoster();
		$('.slider-product__controls-list__item__img').on('click',_changeImg);
	};

	var _setDefaultPoster = function(){
		var controlsList = $('.slider-product__controls-list');
		controlsList.each(function(){
			$(this).find('.slider-product__controls-list__item')
				.first()
				.addClass('active');
		})

	};

	var _changeImg = function(e){

		e.preventDefault();

		var $this = $(this);

		var currentControl = $this.closest('.slider-product__controls-list__item');
		currentControl.addClass('active');

		$this.closest('.slider-product__controls-list')
			.find('.slider-product__controls-list__item')
			.not(currentControl)
			.removeClass('active');

		var srcImg = $this.attr('src');

		var _mainImg = $this.closest('.card-product__slider').find('.slider-product__main-img');

		_mainImg.attr('src', srcImg);



	};

	return {
		init: init
	};

})();

sliderPoster.init();
//*******************************************************************

//********************Select*****************************************

var setSelect = (function(){
	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){

		_createNewSelect();
		$('.le-select__trigger')
			.disableSelection()
			.on('click', _toggleOptions)
			.on('click', _changeArrow);
		$('.le-option').on('click', _changeValue);
	};

	var _selectOrigin = $('.filter__select');

	_selectOrigin.hide();



	var _createNewSelect = function(){

		var _optionsOrigin = _selectOrigin.find('option');

		var _valOptions = [];

		var _newOptions = '';

		_optionsOrigin.each( function(){
			var $this = $(this);

			_valOptions.push($this.text());
		} );

		for(var i = 0; i < _valOptions.length; i++) {
			_newOptions += '<span class = "le-option">' + _valOptions[i] + "</span>"
		}

		var _newSelect = '<div class="le-wrap-select">' +
							'<span class="le-select__trigger">' +
								_valOptions[0] +
							'</span>' +
							'<div class="le-wrap-options">' +
								_newOptions +
							'</div>'+
						'</div>';

		_selectOrigin.after(_newSelect);

	};

	var _toggleOptions = function() {
		var $this = $(this);
		var _wrapOptions = $('.le-wrap-options');

		_wrapOptions.stop(true).queue('fx',
			function(){
				$(this).slideToggle().dequeue('fx');
			});

		$(document).click(function(e) {
			if ($(e.target).closest($this).length === 0) {
				_wrapOptions.slideUp();
			}
		})

	};

	var _changeValue = function() {
		var $this = $(this);
		var _newValue = $this.text();
		$('.le-select__trigger').text(_newValue);
		var _wrapOptions = $('.le-wrap-options');
		_wrapOptions.slideUp();
	};

	var _changeArrow = function() {
		var $this = $(this);
		$this.toggleClass('close-select');

		$(document).click(function(e) {
			if ($(e.target).closest($this).length === 0) {
				$this.removeClass('close-select');
			}
		});
	};


	return {
		init: init
	};
})();

setSelect.init();

//*******************************************************************
