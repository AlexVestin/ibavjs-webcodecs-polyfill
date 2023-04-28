all: libavjs-webcodecs-polyfill.min.js

libavjs-webcodecs-polyfill.js: src/*.ts node_modules/.bin/browserify
	./src/build.js > $@
	sed -i 's/function(f){/function(f){window.LibAVWebCodecs=f();/g' $@
	cp libavjs-webcodecs-polyfill.js ~/clay/monorepo/applications/mineral/clay/clay_app/web/static/external/ffmpeg

libavjs-webcodecs-polyfill.min.js: libavjs-webcodecs-polyfill.js node_modules/.bin/browserify
	./node_modules/.bin/minify --js < $< > $@
	sed -i 's/\!function(e){/\!function(e){window.LibAVWebCodecs=e();/g' $@
	cp libavjs-webcodecs-polyfill.min.js ~/clay/monorepo/applications/mineral/clay/clay_app/web/static/external/ffmpeg

better-samples:
	for i in samples/*/; do \
		mkdir -p web/$$i; \
		cp -a $$i/* web/$$i/; \
		sed 's/<!-- LOAD LIBAV\.JS HERE -->/<script type="text\/javascript">LibAV = {base: "..\/libav"};<\/script><script type="text\/javascript" src="\/libav\/libav-3.6.4.4.1-webm-opus-flac.js"><\/script>/' -i web/$$i/index.html; \
	done
	cp samples/*.* web/samples/

node_modules/.bin/browserify:
	npm install

clean:
	rm -f libavjs-webcodecs-polyfill.js libavjs-webcodecs-polyfill.min.js
