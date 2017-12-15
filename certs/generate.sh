NAME=server
HOSTNAME=extensions.streamlabs.dev


openssl req \
  -newkey rsa:4096 \
  -days 1001 \
  -nodes \
  -x509 \
  -subj "/CN=${HOSTNAME}" \
  -extensions SAN \
  -keyout "${NAME}.key" \
  -out "${NAME}.crt"
  # -config <( cat $( [[ "Darwin" -eq "$(uname -s)" ]]  && echo /System/Library/OpenSSL/openssl.cnf || echo /etc/ssl/openssl.cnf  ) \
    # <(printf "[SAN]\nsubjectAltName='DNS:${HOSTNAME}'")) \

if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "Installing cert into local Keychain."
  echo "To see or modify, run 'Keychain Access' app and look in the 'System' Folder"
  sudo security add-trusted-cert -d -p ssl -r trustRoot -k "/Library/Keychains/System.keychain" "${NAME}.crt"
else
  echo "Please install and trust cert at $DIR/server.crt"
fi


#openssl req \
#    -newkey rsa:2048 \
#    -x509 \
#    -nodes \
#    -keyout "${NAME}.key" \
#    -new \
#    -out "${NAME}.crt" \
#    -subj "/CN=${HOSTNAME}" \
#    -reqexts SAN \
#    -extensions SAN \
#    -config <(cat /System/Library/OpenSSL/openssl.cnf \
#        <(printf "'[SAN]\nsubjectAltName=DNS:${HOSTNAME}'")) \
#    -sha256 \
#    -days 3650

#sudo security add-trusted-cert -d -p ssl -r trustRoot -k "/Library/Keychains/System.keychain" "${NAME}.crt"

#openssl req \
#    -newkey rsa:2048 \
#    -x509 \
#    -nodes \
#    -keyout server.pem \
#    -new \
#    -out server.pem \
#    -subj /CN=localhost \
#    -reqexts SAN \
#    -config <(cat /System/Library/OpenSSL/openssl.cnf \
#        <(printf '[SAN]\nsubjectAltName=DNS:localhost')) \
#    -sha256 \
#    -days 3650
