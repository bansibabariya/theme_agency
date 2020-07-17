odoo.define('website_res_partner_form.web_form', function (require) {
'use strict';

var sAnimations = require('website.content.snippets.animation');
var rpc = require('web.rpc');
var core = require('web.core');
var _t = core._t;

$(document).ready(function(){

    var has_submit_address_clicked = false;
    $("#regFormAddress").on('submit' ,function(e) {
        if (!has_submit_address_clicked){
            has_submit_address_clicked = true;
            e.preventDefault();
            var check_point_data_ids = [];

            $('#one2many_check_point tbody tr').each(function(){
                var check_point_val = {}
                check_point_val['gate_no'] = $(this).find('td .gate_no').val();
                check_point_val['protocol'] = $(this).find('td .protocol').val();
                check_point_val['mobile'] = $(this).find('td .mobile_guard').val();
                check_point_val['notes'] = $(this).find('td .oter_note').val();
                check_point_val['pref_checkpoint'] = $(this).find('td .pref_checkpoint').val();
                check_point_data_ids.push([0, 0, check_point_val]);
            });
            $('input[name="check_point_data_ids"]').val(JSON.stringify(check_point_data_ids));

            $(this).submit();
        }

    });

    var has_submit_clicked = false;
    $("#regForm").on('submit' ,function(e) {
        if (!has_submit_clicked){
            has_submit_clicked = true;
            e.preventDefault();
            var lifestyle_condition_ids = [];
            var surgeries_data_ids = [];
            var ailments_data_ids = [];
            var medication_ids = [];
            var injury_ids = [];

            var food_allergy_ids = $('#food_allergy_ids').val();

//            var food_from = food_allergy_ids.split(",");
                var food_list = []
                if(food_allergy_ids){
                    for(var i = 0; i<food_allergy_ids.length; i++){
                        var x = parseInt(food_allergy_ids[i]);
                        if(x){
                            food_list.push(x);
                        }
                    }
                 }
                $('#data_food_allergy_ids').val(food_list)

                var food_intolerance_ids = $('#food_intolerance_ids').val();
                var intolerance_list = []
                if(food_intolerance_ids){
                    for(var i = 0; i<food_intolerance_ids.length; i++){
                        var x = parseInt(food_intolerance_ids[i]);
                        if(x){
                            intolerance_list.push(x);
                        }
                    }
                }
                $('#data_food_intolerance_ids').val(intolerance_list)

            $('#one2many_lifestyel_condition tbody tr').each(function(){
                var lifestyle_val = {}
                var family = $(this).find('td .family_ids').val()
                var from = family.split(",");
                var list = []
                for(var i = 0; i<from.length; i++){
                    var x = parseInt(from[i]);
                    if(x){
                        list.push(x);
                    }
                }
                lifestyle_val['lifestyle_id'] = $(this).find('td .lifestyle_id').val();
                lifestyle_val['diagnosed_since'] = $(this).find('td .diagnosed_since').val();
                lifestyle_val['remark'] = $(this).find('td .remark').val();
                lifestyle_val['family_ids'] =  [[6, 0, list]];
                lifestyle_condition_ids.push([0, 0, lifestyle_val]);
            });

            $('#one2many_surgery_condition tbody tr').each(function(){
                var surgery_val = {}
                surgery_val['name'] = $(this).find('td .name').val();
                surgery_val['current_past'] = $(this).find('td .current_past').val();
                surgeries_data_ids.push([0, 0, surgery_val]);
            });

            $('#one2many_ailments_condition tbody tr').each(function(){
                var ailments_val = {}
                var family = $(this).find('td .family_ids').val()
                var from = family.split(",");
                var list = []
                for(var i = 0; i<from.length; i++){
                    var x = parseInt(from[i]);
                    if(x){
                        list.push(x);
                    }
                }
                ailments_val['ailments_id'] = $(this).find('td .ailments_id').val();
                ailments_val['family_ids'] = [[6, 0, list]];
                ailments_data_ids.push([0, 0, ailments_val]);
            });

            $('#one2many_medication_condition tbody tr').each(function(){
                var madication_val = {}
                madication_val['category_id'] = $(this).find('td .category_id').val();
                medication_ids.push([0, 0, madication_val]);
            });

            $('#one2many_injury_condition tbody tr').each(function(){
                var injury_val = {}
                injury_val['injury_location_id'] = $(this).find('td .injury_location_id').val();
                injury_ids.push([0, 0, injury_val]);
            });

            $('input[name="lifestyle_condition_ids"]').val(JSON.stringify(lifestyle_condition_ids));
            $('input[name="surgeries_data_ids"]').val(JSON.stringify(surgeries_data_ids));
            $('input[name="ailments_data_ids"]').val(JSON.stringify(ailments_data_ids));
            $('input[name="medication_ids"]').val(JSON.stringify(medication_ids));
            $('input[name="injury_ids"]').val(JSON.stringify(injury_ids));

            $(this).submit();
        }

    });

     $(document).on('click', '#aregFormAddressdd_surgery_condition', function(){
            $('#name').val(' ');
            $('#current_past').val(' ');
     });

     $(document).on('click', '#add_medication_condition', function(){
            $('#category_id').val(' ');
     });

     $(document).on('click', '#add_injury_condition', function(){
            $('#injury_location_id').val(' ');
     });

     $(document).on('click', '#add_surgery_condition', function(){
            $('#name').val('');
            $('#current_past').val(' ');
     });

     $(document).on('click', '#add_ailments_condition', function(){
            $('#ailments_id').val(' ');
            $(".many2mnay_select").select2("val", "");
     })

     $(document).on('click', '#add_check_points', function(){
            $('#gate_no').val(' ');
            $('#protocol').val(' ');
            $('#mobile_guard').val(' ');
            $('#oter_note').val(' ');
     })
     $(document).on('click', '#add_lifestyle_condition', function(){
            $('#lifestyle_id').val(' ');
            $('#diagnosed_since').val(' ');
            $(".many2mnay_select").select2("val", "");
            $('#remark').val(' ');
     })

     function alertWithoutNotice(message){
    setTimeout(function(){
        alert(message);
    }, 1000);
}

});

sAnimations.registry.AddAlernativa = sAnimations.Class.extend({
    selector: '#add_lifestyle_row',
    read_events: {
        'click': '_onClick',
    },
    init: function () {
        this._super.apply(this, arguments);
        $(document).on('click', '#lifestyle_remove_row', function(){
            if(confirm("Are you sure to delete the record?")){
                $(this).parent().parent().remove();
            }
        })
    },
    _onClick: function (ev) {
         var lifestyle_id = $('#lifestyle_id').val();
         if(!lifestyle_id){
            alert("Please enter LifeStyle Condition")
         }
         else{
         var lifestyle_val = $('#lifestyle_id option[value="' + lifestyle_id + '"]').html();
         var diagnosed_since = $('#diagnosed_since').val();
         var diagnosed_since_val = $('#diagnosed_since option[value="' + diagnosed_since + '"]').html();
         var family_ids = $('#family_ids').val();
         var family_ids_val = ''
         for(var i = 0; i<family_ids.length; i++){
            family_ids_val += $('#family_ids option[value="' + [family_ids[i]] + '"]').html();
             if(i>0 && i<family_ids.length-1){
                family_ids_val += ','
            }
         }
         var remark = $('#remark').val();

         $('#one2many_lifestyel_condition tbody').append("<tr><td><span>" + lifestyle_val + "</span><input type='hidden' class='lifestyle_id' name='lifestyle_id' value='" + lifestyle_id + "'></td><td><span>" + diagnosed_since_val + "</span><input type='hidden' class='diagnosed_since' name='diagnosed_since' value='" + diagnosed_since + "'></td><td><span>" + family_ids_val + "</span><input type='hidden' class='family_ids' name='family_ids' value='" + family_ids + "'></td><td><span>" + remark + "</span><input type='hidden' class='remark' name='remark' value='" + remark + "'></td><td><button class='btn btn-danger btn-sm' type='button' id='lifestyle_remove_row'>Delete</td></tr>")
         $('#modal_close').click();
         $(document).on('click', '#lifestyle_remove_row', function(){
            if(confirm("Are you sure to delete the record?")){
                $(this).parent().parent().remove();
            }
         })
         }

    },
});

sAnimations.registry.AddSurgeryData = sAnimations.Class.extend({
    selector: '#add_surgery_row',
    read_events: {
        'click': '_onClick',
    },
    init: function () {
        this._super.apply(this, arguments);
        $(document).on('click', '#surgery_remove_row', function(){
            if(confirm("Are you sure to delete the record?")){
                $(this).parent().parent().remove();
            }
        })
    },
    _onClick: function (ev) {
         var current_past = $('#current_past').val();
         var current_past_val = $('#current_past option[value="' + current_past + '"]').html();
         var name = $('#name').val();
         if(!name){
            alert("Please enter Surgery Detail")
         }
         else{
         $('#one2many_surgery_condition tbody').append("<tr><td><span>" + name + "</span><input type='hidden' class='name' name='name' value='" + name + "'></td><td><span>" + current_past_val + "</span><input type='hidden' class='current_past' name='current_past' value='" + current_past + "'></td><td><button class='btn btn-danger btn-sm' type='button' id='surgery_remove_row'>Delete</td></tr>")
         $('#surgery_modal_close').click();
         $(document).on('click', '#surgery_remove_row', function(){
                if(confirm("Are you sure to delete the record?")){
                $(this).parent().parent().remove();
                }
         })
         }
    },
});

sAnimations.registry.AddCheckPointData = sAnimations.Class.extend({
    selector: '#add_check_point_row',
    read_events: {
        'click': '_onClick',
    },
    init: function () {
        this._super.apply(this, arguments);
        $(document).on('click', '#checkpoint_remove_row', function(){
            if(confirm("Are you sure to delete the record?")){
                $(this).parent().parent().remove();
            }
        })
    },
    _onClick: function (ev) {

//         var pref_checkpoint = $('#pref_checkpoint').val();
         var pref_checkpoint ;
         if($('#pref_checkpoint').prop("checked") == true){
            pref_checkpoint = "True";
        }
        else if($('#pref_checkpoint').prop("checked") == false){
            pref_checkpoint = "False";
        }
         var gate_no = $('#gate_no').val();
         var protocol = $('#protocol').val();
         var mobile_guard = $('#mobile_guard').val();
         var oter_note = $('#oter_note').val();

         $('#one2many_check_point tbody').append("<tr><td><span>" + pref_checkpoint + "</span><input type='hidden' class='pref_checkpoint' name='pref_checkpoint' value='" + pref_checkpoint + "'></td><td><span>" + gate_no + "</span><input type='hidden' class='gate_no' name='gate_no' value='" + gate_no + "'></td><td><span>" + protocol + "</span><input type='hidden' class='protocol' name='protocol' value='" + protocol + "'></td><td><span>" + mobile_guard + "</span><input type='hidden' class='mobile_guard' name='mobile' value='" + mobile_guard + "'></td><td><span>" + oter_note + "</span><input type='hidden' class='oter_note' name='notes' value='" + oter_note + "'></td><td><button class='btn btn-danger btn-sm' type='button' id='checkpoint_remove_row'>Delete</td></tr>")
         $('#check_point_close').click();
         $(document).on('click', '#checkpoint_remove_row', function(){
                if(confirm("Are you sure to delete the record?")){
                $(this).parent().parent().remove();
                }
         })
    },
});


sAnimations.registry.AddAilments = sAnimations.Class.extend({
    selector: '#add_ailments_row',
    read_events: {
        'click': '_onClick',
    },
    init: function () {
        this._super.apply(this, arguments);
        $(document).on('click', '#ailments_remove_row', function(){
            if(confirm("Are you sure to delete the record?")){
                $(this).parent().parent().remove();
            }
        })
    },
    _onClick: function (ev) {
         var ailments_id = $('#ailments_id').val();
          if(!ailments_id){
            alert("Please enter Ailment")
         }
         else{
         var ailments_val = $('#ailments_id option[value="' + ailments_id + '"]').html();

         var family_ids = $('#family_ail_ids').val();
         var family_ids_val = ''
         for(var i = 0; i<family_ids.length; i++){
            family_ids_val += $('#family_ids option[value="' + [family_ids[i]] + '"]').html();
            if(i>0 && i<family_ids.length-1){
                family_ids_val += ','
            }
         }


         $('#one2many_ailments_condition tbody').append("<tr><td><span>" + ailments_val + "</span><input type='hidden' class='ailments_id' name='ailments_id' value='" + ailments_id + "'></td><td><span>" + family_ids_val + "</span><input type='hidden' class='family_ids' name='family_ids' value='" + family_ids + "'></td><td><button class='btn btn-danger btn-sm' type='button' id='ailments_remove_row'>Delete</td></tr>")
         $('#ailments_modal_close').click();
         $(document).on('click', '#ailments_remove_row', function(){
                if(confirm("Are you sure to delete the record?")){
                $(this).parent().parent().remove();
                }
         })
         }

    },
});

sAnimations.registry.AddMedication = sAnimations.Class.extend({
    selector: '#add_medication_row',
    read_events: {
        'click': '_onClick',
    },
    init: function () {
        this._super.apply(this, arguments);
        $(document).on('click', '#medication_remove_row', function(){
            if(confirm("Are you sure to delete the record?")){
                $(this).parent().parent().remove();
            }
        })
    },
    _onClick: function (ev) {
         var category_id = $('#category_id').val();
          if(!category_id){
            alert("Please enter Medication Category")
         }
         else{
         var category_val = $('#category_id option[value="' + category_id + '"]').html();

         $('#one2many_medication_condition tbody').append("<tr><td><span>" + category_val + "</span><input type='hidden' class='category_id' name='category_id' value='" + category_id + "'></td><td><button class='btn btn-danger btn-sm' type='button' id='medication_remove_row'>Delete</td></tr>")
         $('#medication_modal_close').click();
         $(document).on('click', '#medication_remove_row', function(){
                if(confirm("Are you sure to delete the record?")){
                $(this).parent().parent().remove();
                }
         })
         }

    },
});

sAnimations.registry.AddInnjury = sAnimations.Class.extend({
    selector: '#add_injury_row',
    read_events: {
        'click': '_onClick',
    },
    init: function () {
        this._super.apply(this, arguments);
        $(document).on('click', '#injury_remove_row', function(){
            if(confirm("Are you sure to delete the record?")){
                $(this).parent().parent().remove();
            }
        })
    },
    _onClick: function (ev) {
         var injury_location_id = $('#injury_location_id').val();
          if(!injury_location_id){
            alert("Please enter Pain / Injury Location")
         }
         else{
         var injury_location_val = $('#injury_location_id option[value="' + injury_location_id + '"]').html();
         $('#one2many_injury_condition tbody').append("<tr><td><span>" + injury_location_val + "</span><input type='hidden' class='injury_location_id' name='injury_location_id' value='" + injury_location_id + "'></td><td><button class='btn btn-danger btn-sm' type='button' id='injury_remove_row'>Delete</td></tr>")
         $('#injury_modal_close').click();
         $(document).on('click', '#injury_remove_row', function(){
            if(confirm("Are you sure to delete the record?")){
                $(this).parent().parent().remove();
                }
         })
        }
    },
});



});