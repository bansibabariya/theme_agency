from odoo import fields, http, tools, _
from odoo.addons.portal.controllers.portal import CustomerPortal
from odoo.http import request
import json
import base64


class CustomerPortal(http.Controller):

    @http.route(["/about-agency"], type='http', auth="public", website=True)
    def about_agency(self, page=0, *args, **kwargs):
        return request.render('website_agency.about-agency', {})\

    @http.route(["/customers"], type='http', auth="public", website=True)
    def customers(self, page=0, *args, **kwargs):
        return request.render('website_agency.customers', {})\

    @http.route(["/customer-story"], type='http', auth="public", website=True)
    def customer_story(self, page=0, *args, **kwargs):
        return request.render('website_agency.customer-story', {})\

    @http.route(["/pricing"], type='http', auth="public", website=True)
    def pricing(self, page=0, *args, **kwargs):
        return request.render('website_agency.pricing', {})\

    @http.route(["/services-agency"], type='http', auth="public", website=True)
    def services_agency(self, page=0, *args, **kwargs):
        return request.render('website_agency.services-agency', {})
