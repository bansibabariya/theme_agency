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
