FROM python:3.9
WORKDIR /app
ENV FLASK_APP=setup

COPY . .
RUN pip install -r requirements.txt

CMD ["flask", "run", "--host=0.0.0.0", "--port=1234"]