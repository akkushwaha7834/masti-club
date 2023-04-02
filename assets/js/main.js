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
var fileobj;
    function upload_file(e) {
        e.preventDefault();
        ajax_file_upload(e.dataTransfer.files);
    }

    function file_explorer() {
        document.getElementById('selectfile').click();
        document.getElementById('selectfile').onchange = function() {
            files = document.getElementById('selectfile').files;
            ajax_file_upload(files);
        };
    }

    function ajax_file_upload(file_obj) {
        if(file_obj != undefined) {
            var formdata = new FormData();
            formdata.append('_token', 'wvmZC3m8J6rlKlKPclwWpK0PWNQodVRSAO3gBNbm');
            formdata.append('keys', 'in6831b799758135f1a14df0f5470c264c');
            $('#loading').css('display', 'block');

            for(i=0; i<=file_obj.length; i++) {
                formdata.append('file[]', file_obj[i]);
            }
            $.ajax({
                type: 'POST',
                url: baseUrl+'/ajax_image_upload',
                contentType: false,
                processData: false,
                data: formdata,
                beforeSend:function(){
                    $('#success').empty();
                    $('.progress-bar').text('0%');
                    $('.progress-bar').css('width', '0%');
                },
                uploadProgress:function(event, position, total, percentComplete){
                    $('.progress-bar').text(percentComplete + '0%');
                    $('.progress-bar').css('width', percentComplete + '0%');
                },
                success:function(data) {
                    if(data.files) {
                            var myHtml = "";
                            data.files.forEach(function(item,key) {
                                myHtml +='<div class="img-upload-grid remove-img-grid" id="proimg_'+item[0]+'"> <div class="up-img-inner-box img-inserted"><label class="card w-100 mb-0"><input  type="hidden" name=""><div class="img-preview-label no-drag" profile-id="'+item[0]+'"></div><div class="image-overlay-item-wrap"><span class="delete-img" data-id="'+item[0]+'"><i class="fa fa-times" aria-hidden="true"></i></span><span class="rotate-img" onclick="rotateElem('+item[0]+')"><i class="fa fa-undo" aria-hidden="true"></i></div><img src="'+item[1]+'" class="uploaded-img pic-view_'+item[0]+'" image-id="'+item[0]+'" id="pic-view"></label></div></div>';
                             });
                            $('.remove-img-grid').remove();
                            $('#img-drag-and-drop').prepend(myHtml);
                            $('input[name="profile_images_id"]').attr('value',data.images_ids);
                          } //if files get
                      $('#loading').css('display', 'none');
                    },
                    error: function (xhr, status, error) {
                       if(status=='error'){
                           alert("Image(s) couldn't be saved. Please check if you are trying to save more than 10 images or other than JPEG,JPG, PING or the images more than 3MB.")
                       }else{
                           alert(xhr.responseText);
                       }
                    $('#loading').css('display', 'none');
                    }
            });
        }
    }

    $(document).on("click", "span.delete-img" , function() {
            var token = $('meta[name="csrf-token"]').attr('content');
            var profile_image_id = $(this).attr('data-id');
            $.ajax({
                    url: baseUrl+'/ajax_image_remove',
                    type:'POST',
                    data: {
                            "profile_image_id": profile_image_id,
                            "_token": token,
                    },
                    success: function (data){
                        $('#proimg_'+data).remove();
                    }
            });
    });
    $(document).on("click", '.uploaded-img' , function() {
        var token = $('meta[name="csrf-token"]').attr('content');
        var profile_id = $(this).attr('image-id');
        $.ajax({
            url: baseUrl+'/ajax_image_setprofile',
            type:'POST',
            data: {
                    "profile_id": profile_id,
                    "_token": token,
            },
            success: function (data){   
                $("div").removeClass("img-preview-active");                         
                $("div[profile-id='"+profile_id+"']").addClass('img-preview-active');
            }
        });
    });