class ClassA:
    def method_a(self):
        print("This is method_a from ClassA")
class ClassB:
    def method_b(self):
        print("This is method_b from ClassB")
class ClassC:
    def method_c(self):
        print("This is method_c from ClassC")
class ClassD(ClassA, ClassB, ClassC):
    pass



d = ClassD()

d.method_a()
d.method_b()
d.method_c()

