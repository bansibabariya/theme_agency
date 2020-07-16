from odoo import fields, http, tools, _
from odoo.addons.portal.controllers.portal import CustomerPortal
from odoo.http import request
import json
import base64


class CustomerPortal(http.Controller):

    @http.route(["/customer-portal"], type='http', auth="user", website=True)
    def customer_portal(self, page=0, *args, **kwargs):
        gender = request.env['alt.gender'].sudo().search([],order='name')
        cities = request.env['city.city'].sudo().search([],order='name')
        blood_groups = request.env['blood.group'].sudo().search([],order='name')
        products = request.env['product.template'].sudo().search([],order='name')
        titles = request.env['res.partner.title'].sudo().search([],order='name')
        coaches = request.env['res.partner'].sudo().search([],order='name')
        referral_types = request.env['referral.type'].sudo().search([],order='name')
        customer_sources = request.env['customer.source'].sudo().search([],order='name')
        travel_frequencies = request.env['travel.frequency'].sudo().search([],order='name')
        life_styles = request.env['life.style'].sudo().search([],order='name')
        partner = request.env.user.partner_id
        food_allergy = request.env['food.allergy'].sudo().search([],order='name')
        food_intolerance = request.env['food.intolerance'].sudo().search([],order='name')
        medical_history = request.env['medical.history'].sudo().search([('partner_id','=',partner.id)])
        if not medical_history:
            medical_history = request.env['medical.history'].sudo().create({'partner_id' :partner.id})
        lifestyle_condition_ids = request.env["lifestyle.condition"].sudo().search([])
        lifestyle_ids = request.env["lifestyle.lifestyle"].sudo().search([],order='name')
        family_ids = request.env["family.history"].sudo().search([],order='name')

        surgeries_data_ids = request.env["surgeries.surgeries"].sudo().search([])
        ailments_data_ids = request.env["ailments.data"].sudo().search([])
        ailments_ids = request.env["ailments.ailments"].sudo().search([])
        medication_ids = request.env["medication.medication"].sudo().search([])
        category_ids = request.env["medicine.category"].sudo().search([])
        injury_location_ids = request.env["injury.location"].sudo().search([])

        api_key = request.env['ir.config_parameter'].sudo().search([('key', '=', 'key')])
        return request.render('website_res_partner_form.customer_portal_template', {'gender':gender,
                                                                                    'cities':cities,
                                                                                    'titles':titles,
                                                                                    'blood_groups':blood_groups,
                                                                                    'products':products,
                                                                                    'coaches':coaches,
                                                                                    'referral_types':referral_types,
                                                                                    'customer_sources':customer_sources,
                                                                                    'travel_frequencies':travel_frequencies,
                                                                                    'life_styles':life_styles,
                                                                                    'partner':partner,
                                                                                    'medical_history':medical_history,
                                                                                    'food_allergy': food_allergy,
                                                                                    'food_intolerance': food_intolerance,
                                                                                    'lifestyle_condition_ids': lifestyle_condition_ids,
                                                                                    'lifestyle_ids': lifestyle_ids,
                                                                                    'family_ids': family_ids,
                                                                                    'surgeries_data_ids': surgeries_data_ids,
                                                                                    'ailments_data_ids': ailments_data_ids,
                                                                                    'ailments_ids': ailments_ids,
                                                                                    'medication_ids': medication_ids,
                                                                                    'category_ids': category_ids,
                                                                                    'injury_location_ids': injury_location_ids,
                                                                                    'api_key': api_key,
                                                                                    })

    @http.route(["/section-a-submit"], type='http', auth="user", website=True)
    def section_a_submitted(self, page=0, *args, **kwargs):
        if kwargs.get('pregnant') == 'yes':
            pregnant = True
        else:
            pregnant = False
        if kwargs.get('partner_id'):
            partner = request.env['res.partner'].sudo().search([('id','=',int(kwargs.get('partner_id')))])
            partner.write({
                'birth_date' : kwargs.get('birth_date'),
                'blood_group_id' : kwargs.get('blood_group_id'),
                'email' : kwargs.get('email'),
                'marital_status' : kwargs.get('marital_status'),
                'emergency_contact' : kwargs.get('emergency_contact'),
                'travel_frequency' : kwargs.get('travel_frequency'),
                'motivation' : kwargs.get('motivation'),
                'pregnancy' : pregnant,
            })
        return request.render('website_res_partner_form.section_a_form_submitted')

    @http.route("/section-b-submit", type='http', auth="user",website=True)
    def section_b_submitted(self, **kwargs):
        if kwargs.get('partner_id'):
            # for get partner and hestory
            partner = request.env['res.partner'].sudo().search([('id', '=', int(kwargs.get('partner_id')))])
            medical_history = request.env['medical.history'].sudo().search([('id', '=', int(kwargs.get('medical_history')))])
            if kwargs.get('lifestyle_condition_ids'):
                lifestyle_condition = json.loads(kwargs.get('lifestyle_condition_ids'))
                if medical_history:
                    for lifestyle_condition_id in medical_history.lifestyle_condition_ids:
                        lifestyle_condition_id.unlink()
                    medical_history.write({
                        'lifestyle_condition_ids': lifestyle_condition,
                    })
            # for surgeries_data
            if kwargs.get('surgeries_data_ids'):
                surgery = json.loads(kwargs.get('surgeries_data_ids'))
                if medical_history:
                    for surgeries_data_id in medical_history.surgeries_data_ids:
                        surgeries_data_id.unlink()
                    medical_history.write({
                        'surgeries_data_ids': surgery,
                    })
            # for medication_data
            if kwargs.get('medication_ids'):
                medication = json.loads(kwargs.get('medication_ids'))
                if medical_history:
                    for medication_id in medical_history.medication_ids:
                        medication_id.unlink()
                    medical_history.write({
                        'medication_ids': medication,
                    })
            # for injury_data
            if kwargs.get('injury_ids'):
                injury = json.loads(kwargs.get('injury_ids'))
                if medical_history:
                    for injury_location_id in medical_history.injury_location_ids:
                        injury_location_id.unlink()
                    medical_history.write({
                        'injury_location_ids': injury,
                    })
            # for ailments_data
            if kwargs.get('ailments_data_ids'):
                ailments = json.loads(kwargs.get('ailments_data_ids'))
                if medical_history:
                    for ailments_id in medical_history.ailments_data_ids:
                        ailments_id.unlink()
                    medical_history.write({
                        'ailments_data_ids': ailments,
                    })
            # for data_food_allergy
            if kwargs.get('data_food_allergy_ids'):
                data_food_list = []
                data_food_allergy_ids = kwargs.get('data_food_allergy_ids')
                data_food_split = data_food_allergy_ids.split(',')
                for data_food in data_food_split:
                    data_food_temp = int(data_food)
                    data_food_list.append(data_food_temp)
                partner.food_allergy_ids = [[6, 0, data_food_list]]
            # for data_food_intolerance
            if kwargs.get('data_food_intolerance_ids'):
                data_intolerance_list = []
                data_food_intolerance_ids = kwargs.get('data_food_intolerance_ids')
                data_intolerance_split = data_food_intolerance_ids.split(',')
                for data_intolerance in data_intolerance_split:
                    data_intolerance_temp = int(data_intolerance)
                    data_intolerance_list.append(data_intolerance_temp)
                partner.food_intolerance_ids = [[6, 0, data_intolerance_list]]
        return request.render('website_res_partner_form.section_b_form_submitted')

    @http.route(["/section-c-submit"], type='http', auth="user", website=True)
    def section_c_submitted(self, page=0, *args, **kwargs):
        if kwargs.get('partner_id'):
            partner = request.env['res.partner'].sudo().search([('id','=',int(kwargs.get('partner_id')))])
            partner.child_ids = [(0,0,{
                'name': kwargs.get('name'),
                'type': kwargs.get('type'),
                'latitude': kwargs.get('lat'),
                'longitude': kwargs.get('lng'),
                'landmark': kwargs.get('landmark'),
                'city': kwargs.get('city_id'),
                'mobile': kwargs.get('mobile'),
                'delivery_type': kwargs.get('delivery_type'),
                'delivery_note': kwargs.get('delivery_note'),
            })]
            child = request.env['res.partner'].sudo().search([('id','in',partner.child_ids.ids)],limit=1,order='create_date desc')
            child.country_id = False
            child.state_id = False
            child.zip = False
            child.street = kwargs.get('line1')
            if kwargs.get('check_point_data_ids'):
                check_point_data_ids = json.loads(kwargs.get('check_point_data_ids'))
                for check_point_data_id in check_point_data_ids:
                    if check_point_data_id[2].get('pref_checkpoint') == 'True':
                        check_point_data_id[2].update({
                            'pref_checkpoint' : True
                        })
                    else:
                        check_point_data_id[2].update({
                            'pref_checkpoint': False
                        })
                child.partner_check_points_ids = check_point_data_ids
        return request.render('website_res_partner_form.section_c_form_submitted')

    @http.route(['/user-details/<model("res.partner"):Partner>'], type='http', auth="public", website=True)
    def user_details(self, Partner=None, **kwargs):
        partner = request.env['res.partner'].sudo().search([('id', '=', Partner.id)])
        cities = request.env['city.city'].sudo().search([])
        api_key = request.env['ir.config_parameter'].sudo().search([('key', '=', 'key')])
        return request.render('website_res_partner_form.user_details',{'partner':partner,
                                                                       'api_key':api_key,
                                                                       'cities':cities})

    @http.route("/user-detail-submit", type='http', auth="user", website=True)
    def user_details_submitted(self, **kwargs):
        if kwargs.get('partner_id'):
            # for get partner and hestory
            partner = request.env['res.partner'].sudo().search([('id', '=', int(kwargs.get('partner_id')))])

            # for surgeries_data
            if partner:
                partner.write({
                    'name': kwargs.get('name'),
                    'type': kwargs.get('type'),
                    'latitude': kwargs.get('lat'),
                    'longitude': kwargs.get('lng'),
                    'landmark': kwargs.get('landmark'),
                    'city': kwargs.get('city_id'),
                    'mobile': kwargs.get('mobile'),
                    'delivery_type': kwargs.get('delivery_type'),
                    'street': kwargs.get('line1'),
                    'delivery_note': kwargs.get('delivery_note'),
                })
            if kwargs.get('check_point_data_ids'):
                check_point_data = json.loads(kwargs.get('check_point_data_ids'))
                if check_point_data:
                    for partner_check_points_id in partner.partner_check_points_ids:
                        partner_check_points_id.unlink()
                    partner.write({
                        'partner_check_points_ids': check_point_data,
                    })
        return request.render('website_res_partner_form.section_c_form_submitted')

