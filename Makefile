lint:
	npx eslint .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test_coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --test_coverage
