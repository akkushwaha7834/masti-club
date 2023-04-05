 $('.repeat-credit-items').click(function () {
            $('.repeat-credit-items').removeClass("selected");
            $(this).addClass("selected");
        });
        
    $(".product_box").click(function () {
    if($(this).hasClass('selected') ) {
        $(this).removeClass('selected');    
        $('#promote').attr("disabled", true);
        var price = $(this).attr('price'); 
        $("#total_price_val").val('');
        $('#total_price_text').empty('<p>Total Price: <span>Rs '+price+'</span></p>');   
        product_name = this.getAttribute('id');
        pro_div = 'div_'+product_name;         
        $('.time_day').each(function(){             
            if(this.getAttribute('id')==pro_div){
                $(this).addClass("hidden");
             }
        }); 
        $('.upgrade-section').attr("hidden");
        $('.upgrade-section').addClass("hidden");
         
    }else {
        $('.product_box').removeClass('selected');
        $(this).addClass('selected');  
        var price = $(this).attr('price'); 
        $("#product_id").val($(this).attr('data-product-id'));
        $("#total_price_val").val($(this).attr('price'));
                $('#total_price_text').html('<p>Total Price: <span>Rs '+price+'</span></p>');
                $('.print-error-promote').hide();
                 $('#promote').removeAttr("disabled", true)
        $(window).scrollTop(450);       
        product_name = this.getAttribute('id');
        pro_div = 'div_'+product_name; 
        $('.time_day').each(function(){             
            if(this.getAttribute('id')==pro_div){
                $(this).removeClass("hidden");
             }else{
                 $(this).addClass("hidden");
             }
        });
        
        $('.upgrade-section').removeClass("hidden");
        $('.premium-upgrade').addClass("hidden");     
         
    }
         
});
        
$('.selectdiv').click(function(){
    var current_price = this.getAttribute('current-price');
    var total_price   = this.getAttribute('total-price');
    var exclusive_price = this.getAttribute('exclusive-price');
    $('#exclusive-price').html('<p>Premium <strong>Rs '+exclusive_price+'</strong> <img src="assets/images/hot-price.png" class="hot-price"><span class="checked-sign">&nbsp;</span></p>');
    $('#exclusive-price').attr('total-price',total_price);
    $('#exclusive-price').attr('current-price',current_price);
    $('#exclusive-price').attr('exclusive-price',exclusive_price);
    $('.premium-upgrade').removeClass("hidden");
    $('.premium-label').removeClass("fade-panel"); 
    
    parent_radio = $(this).children("input")[0];
    $('.select_time_data').each(function(){
        var selValue = $("input[type='radio']:checked").val();
        $("#time_slot").val(selValue);  
        if(this==parent_radio){ 
            $(this).attr('checked',true);
            $(this).prop('checked' ,true);
            $(this).parent().addClass('selected');
        }else{
            $(this).attr('checked',false);
            $(this).prop('checked' ,false);
            $(this).parent().removeClass('selected');
        }

    });      
});

$('#dimoff').click(function(){
    $('#dimoco').show();
    $('.dimoff').addClass('not-active')
    $('.dimoff').attr("disabled", true);
});
$('.premium-div-button').click(function(){
    if($(this).hasClass('selected') ) {
        $(this).removeClass('selected');
         $('#exclusive-checkbox').attr('checked',false);
        $('#exclusive-checkbox').prop('checked' ,false);
        $('#exclusive-checkbox').attr('value',0);
        var currentPrice = $('#exclusive-price').attr('current-price'); 
        $('#total_price_text').html('<p>Total Price: <span>Rs '+currentPrice+'</span></p>');
        $('#exclusive_amount').val(0.00);
        
    }else{
        $(this).addClass('selected');       
        $('#exclusive-checkbox').attr('checked',true);
        $('#exclusive-checkbox').prop('checked' ,true);
        $('#exclusive-checkbox').attr('value',1);
        var totalPrice = $('#exclusive-price').attr('total-price'); 
        var totalPriceExclusive = $('#exclusive-price').attr('exclusive-price'); 
        $('#total_price_text').html('<p>Total Price: <span>Rs '+totalPrice+'</span></p>');
        $('#exclusive_amount').val(totalPriceExclusive);
    }
});
  $('.whatapp-tick-row').click(function () {            
        $('.whatapp-tick-row').toggleClass("selected");
    });


