// QuerySyntax

import { OOPLang } from '../../interfaces'

// TODO: 修改查询内容
class JavaQS implements OOPLang.OOPLangQuerySyntaxs {
    /* CAI name */
    classNameQS: string = `(class_declaration
  name: (type_identifier ) @class-name)`
    abstractClassNameQS: string = `(abstract_class_declaration
  name: (type_identifier ) @abstract-class-name)`
    interfaceNameQS: string = `(interface_declaration
  name: (type_identifier ) @interface-name)`

    /* 方法和属性 */
    abstract_method_signature: string = `abstract_method_signature`
    abstract_method_name: string = `property_identifier`
    method_definition: string = `method_definition`
    method_name: string = `property_identifier`
    property_definition: string = `public_field_definition`
    property_name: string = `property_identifier`
    
}

export const javaQS = new JavaQS()