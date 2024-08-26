.PHONY: up down

up:
	migrate --path backend/app/database/migrations --database "postgresql://root:password@localhost:5432/template?sslmode=disable" -verbose up

down:
	migrate --path backend/app/database/migrations --database "postgresql://root:password@localhost:5432/template?sslmode=disable" -verbose down
