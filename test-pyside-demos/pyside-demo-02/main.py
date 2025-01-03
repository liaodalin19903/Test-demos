# This Python file uses the following encoding: utf-8
import sys
from PySide6.QtWidgets import QApplication

from MyWidget import MyWidget

if __name__ == "__main__":
    app = QApplication(sys.argv)
    # ...

    widget = MyWidget()
    widget.show()

    print(1123)

    sys.exit(app.exec())
