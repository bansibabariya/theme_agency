# -*- coding: utf-8 -*-
{
    'name': 'Theme Agency',
    'summary': "Theme Agency Page for About Agency, Customers, Pricing, Service Agency",
    'version': '1.0',
    'category': 'Website',
    'author': 'Bansi',
    'depends': ['base', 'website', 'portal'],
    'data': [
        'views/assets.xml',
        'views/header.xml',
        'views/footer.xml',
        'views/about-agency.xml',
        'views/customers.xml',
        'views/customer-story.xml',
        'views/pricing.xml',
        'views/services-agency.xml',
        'views/terms.xml',
    ],
    'application': True,
    'installable': True,
    'auto_install': False,
}