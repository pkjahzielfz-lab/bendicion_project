from mangum import Mangum
from bendicion_project.wsgi import application

handler = Mangum(application)