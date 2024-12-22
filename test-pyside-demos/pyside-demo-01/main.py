
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton 

import sys 

class ButtonHolderWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("测试窗口")
        button = QPushButton("点击")
        button.clicked.connect(self.handle_clivck)
        self.setCentralWidget(button)

    def handle_clivck():
        print('clicked.')    

app = QApplication(sys.argv)

window = ButtonHolderWindow()
window.show()

app.exec()


