.PHONY: local-up local-down test-build test-cancioneiro test-noticias run_all_tests

local-up:
	@echo "Starting development server..."
	npm run dev

local-down:
	@echo "Stopping development server..."
	@lsof -ti :5173 | xargs kill -9 2>/dev/null || echo "No server running on port 5173"

test-build:
	@echo "Running production build..."
	npm run build
	@echo "Build successful!"

test-cancioneiro:
	@echo "Running cancioneiro tests..."
	npx vitest run src/config/__tests__/cancioneiro.test.js

test-noticias:
	@echo "Running noticias tests..."
	npx vitest run src/config/__tests__/noticias.test.js

run_all_tests:
	@echo "Running all tests..."
	npm test
	@echo "All tests passed!"
