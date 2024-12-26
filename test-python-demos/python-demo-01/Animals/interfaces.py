# interfaces.py
from typing import Protocol


class Animal(Protocol):
    def feed(self) -> None:
        pass
