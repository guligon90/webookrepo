#!/bin/bash

function add() {
    # Create JWT secret for token signature
    kubectl create secret generic jwt-secret --from-literal='JWT_KEY=aVerySecretString'
}

function remove() {
    kubectl delete secret jwt-secret
}

$@
