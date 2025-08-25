import logging
from datetime import datetime
import os

def setup_logger():
    # Crear carpeta de logs si no existe
    if not os.path.exists('logs'):
        os.makedirs('logs')

    # Configurar el logging
    log_filename = f"logs/matrix_calculator_{datetime.now().strftime('%Y%m%d')}.log"

    logging.basicConfig(
        level=logging.INFO,
        format='%(acstime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_filename),
            logging.StreamHandler() # También mostrar en consola
        ]
    )

    return logging.getLogger('MatrixCalculator')

logger = setup_logger()