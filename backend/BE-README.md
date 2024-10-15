# Kitchen Served Backend

cd `backend`
create venv - `python -m venv venv`
activate the venv - `source venv/bin/activate`
`pip install -r requirements.txt`
run app - `cd ..` && `uvicorn backend.main:app --reload`

## Docker
`docker build -t kitchen-served-be .`
`docker run -p 8000:8000 kitchen-served-be`
test on `http://127.0.0.1:5000/api/price?item=%22ps4%22`
