from PySide6.QtWidgets import QMainWindow, QPushButton, QHBoxLayout

class RockWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        #self.setTitle('RockWindow')
        button1 = QPushButton('button1')
        button2 = QPushButton('button2')

        layout = QHBoxLayout()
        layout.addWidget(button1)
        layout.addWidget(button2)

        self.setLayout(layout)
