# Generates the Graph of the model
import visualkeras

from keras.models import load_model
import os

my_model = os.listdir('../../media/uploads')[0]
print('../../media/uploads/' + my_model)
model = load_model('../../media/uploads/' + my_model)

visualkeras.graph_view(model, to_file='../../media/generated_pngs/output.png')