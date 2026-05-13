# from django.apps import AppConfig

# class NilaappConfig(AppConfig):
#     name = 'NilaApp'

from django.apps import AppConfig


class NilaappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'NilaApp'

    def ready(self):
        import NilaApp.signals
