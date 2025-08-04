"""Connection with Posgress DB on localhost."""
import psycopg2


class DatabaseConnection:
    """It has resposability for DB connection."""

    def __init__(self):
        self.connection = None
        self.cursor = None

    def connect(self):
        """Try one connection with parameters to access."""
        try:
            self.connection = psycopg2.connect(
                host="localhost",
                dbname="Seminar",
                user="postgres",
                password="1234",
                port=5432
            )
            self.cursor = self.connection.cursor()
        except psycopg2.Error as exception:
            print(f"Error al conectar: {exception}")

    def close(self):
        """Close connection wirh DB."""
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
