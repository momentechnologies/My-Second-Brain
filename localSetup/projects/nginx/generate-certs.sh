#!/bin/sh
set -e

CA_DIR=/etc/ca
CERTS_DIR=/etc/ssl/private

DOMAINS="\
DNS:api.mysecondbrain.test, \
DNS:mysecondbrain.test \
"

if [ ! -f "$CA_DIR/ca.key" ]; then
  echo Generating CA key..
  openssl genrsa -out "$CA_DIR/ca.key" 4096

  echo Generating CA cert..
  openssl req \
    -x509 \
    -new \
    -nodes \
    -key "$CA_DIR/ca.key" \
    -sha256 \
    -days 3650 \
    -out "$CA_DIR/cacert.pem" \
    -subj '/C=NO/ST=Vestland/L=Bergen/O=Moment Technologies AS/OU=local/CN=mysecondbrain.ai/emailAddress=local@mysecondbrain.ai'
fi

if \
  [ ! -f "$CERTS_DIR/domains.txt" ] || \
  ! echo "$DOMAINS" | diff -q - "$CERTS_DIR/domains.txt" > /dev/null
then
  echo "$DOMAINS" > "$CERTS_DIR/domains.txt"

  echo "Generating site certificate..."
  rm -f "$CERTS_DIR/mysecondbrain.*"

  OPENSSL_CONFIG=$(mktemp)
  {
    echo '[dn]'
    echo 'CN=localhost'
    echo '[req]'
    echo 'distinguished_name = dn'
    echo '[EXT]'
    echo "subjectAltName = $DOMAINS"
    echo 'keyUsage=digitalSignature'
    echo 'extendedKeyUsage=serverAuth'
  } > "$OPENSSL_CONFIG"

  openssl req \
    -nodes \
    -newkey rsa:2048 \
    -subj '/CN=localhost' \
    -extensions EXT \
    -keyout "$CERTS_DIR/mysecondbrain.key" \
    -out "$CERTS_DIR/mysecondbrain.csr" \
    -config "$OPENSSL_CONFIG"
  rm "$OPENSSL_CONFIG"

  EXTFILE=$(mktemp)
  echo "subjectAltName = $DOMAINS" > "$EXTFILE"
  openssl x509 \
    -req \
    -in "$CERTS_DIR/mysecondbrain.csr" \
    -CA "$CA_DIR/cacert.pem" \
    -CAkey "$CA_DIR/ca.key" \
    -CAcreateserial \
    -out "$CERTS_DIR/mysecondbrain.crt" \
    -days 825 \
    -sha256 \
    -extfile "$EXTFILE"
  rm "$EXTFILE"
fi

exit 0