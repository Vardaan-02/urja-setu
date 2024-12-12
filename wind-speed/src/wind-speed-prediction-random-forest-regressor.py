import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
import joblib

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

# Step 4: Train a Random Forest model
model = RandomForestRegressor(random_state=42, n_estimators=100)
model.fit(X_train, y_train)

# Step 5: Evaluate the model
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
rmse = mean_squared_error(y_test, y_pred, squared=False)

print(f"Mean Absolute Error (MAE): {mae}")
print(f"Root Mean Squared Error (RMSE): {rmse}")

# Step 6: Save the trained model
model_file = 'wind_speed_predictor_rf.pkl'
joblib.dump(model, model_file)
print(f"Model saved to '{model_file}'")

# Step 7: Save predictions to a CSV
output = pd.DataFrame({'Actual': y_test, 'Predicted': y_pred})
output.to_csv('predictions.csv', index=False)
print("Predictions saved to 'predictions.csv'")
