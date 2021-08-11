#!/bin/bash

# Create JWT secret for token signature
kubectl create secret generic jwt-secret --from-literal='JWT_KEY=aVerySecretString'
