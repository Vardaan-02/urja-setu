import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Input
import joblib

# Ensure TensorFlow uses CPU
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

# Step 1: Load the dataset
file_path = './weather_data.csv'  # Replace with the path to your dataset
data = pd.read_csv(file_path)

# Step 2: Preprocess the data
# Convert Date_Time to datetime and extract features
data['Date_Time'] = pd.to_datetime(data['Date_Time'])
data['Year'] = data['Date_Time'].dt.year
data['Month'] = data['Date_Time'].dt.month
data['Day'] = data['Date_Time'].dt.day
data['Hour'] = data['Date_Time'].dt.hour
data = data.drop(columns=['Date_Time'])

# One-hot encode the 'Location' column
data = pd.get_dummies(data, columns=['Location'], drop_first=True)

# Check for missing values and drop rows with missing data
data = data.dropna()

# Step 3: Split the data into features and target
X = data.drop(columns=['Wind_Speed_kmh'])
y = data['Wind_Speed_kmh']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 4: Build the neural network model
model = Sequential()
model.add(Input(shape=(X_train.shape[1],)))
model.add(Dense(128, activation='relu'))
model.add(Dense(64, activation='relu'))
model.add(Dense(1, activation='linear'))

model.compile(optimizer='adam', loss='mean_squared_error', metrics=['mean_absolute_error'])

# Step 5: Train the model
history = model.fit(X_train, y_train, validation_split=0.2, epochs=50, batch_size=32, verbose=1)

# Step 6: Evaluate the model
val_loss, val_mae = model.evaluate(X_test, y_test)
print(f"Validation Loss (MSE): {val_loss}")
print(f"Validation MAE: {val_mae}")

# Step 7: Save the trained model
model.save('wind_speed_predictor.h5')
print("Model saved to 'wind_speed_predictor.h5'")

# Step 8: Make predictions
predictions = model.predict(X_test)
print("Predictions:", predictions[:10])  # Display the first 10 predictions

# Optional: Save predictions to a CSV
output = pd.DataFrame({'Actual': y_test, 'Predicted': predictions.flatten()})
output.to_csv('predictions.csv', index=False)
print("Predictions saved to 'predictions.csv'")
