from odoo import models, fields, api, _

class resConfig(models.TransientModel):
    _inherit = 'res.config.settings'

    key = fields.Char(string="Map Key")

    @api.model
    def get_values(self):
        res = super(resConfig, self).get_values()
        params = self.env['ir.config_parameter'].sudo()
        key = params.get_param('key')
        res.update(
            key = key and (int(key) if type(key) == int else key) or '',
        )
        return res

    def set_values(self):
        res = super(resConfig, self).set_values()
        config = self.env['ir.config_parameter'].sudo()
        config.set_param('key', self.key and self.key or '')