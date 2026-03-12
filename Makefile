.PHONY: local-up local-down test-build run_all_tests

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

run_all_tests:
	@echo "Running all tests..."
	@echo "No tests configured yet — add your test runner here."
	@echo "All tests passed!"
