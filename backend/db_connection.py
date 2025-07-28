import psycopg2


class DatabaseConnection:
    def __init__(self):
        self.connection = None
        self.cursor = None

    def connect(self):
        try:
            self.connection = psycopg2.connect(
                host="localhost",
                dbname="Seminar",
                user="postgres",
                password="1234",
                port=5432
            )
            self.cursor = self.connection.cursor()
        except psycopg2.Error as e:
            print(f"Error al conectar: {e}")

    def close(self):
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
