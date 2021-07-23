sync:
	(cd ../../ && rm adobe-react-native-acpmedia-3.0.0.tgz || true)
	(cd ../../ && npm pack)
	(rm -r node_modules/@adobe/react-native-acpmedia || true)
	(rm package-lock.json || true)
	(npm cache clean --force && npm install)