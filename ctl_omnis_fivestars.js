ctrl_net_omnis_fivestar.prototype = (function() {
    // Omnis Studio Javascipt component, built using the JSON defined control editor.

    var ctrl = new ctrl_base()

    ctrl.init_class_inst = function() {
        this.superclass = ctrl_base.prototype
        this.superclass.init_class_inst.call(this)
        this.component = new fivestars.FiveStarsJSONComponent(this)
    }

    ctrl.delete_class_inst = function() {
        //TODO: Any custom cleanup when control is deleted. Remove function if no custom behaviour required.
        this.component.delete_class_inst()
        this.superclass.delete_class_inst.call(this) // Call superclass version to perform standard deletion procedure.
    }

    ctrl.init_ctrl_inst = function(form, elem, rowCtrl, rowNumber) {
        this.superclass.init_ctrl_inst.call(this, form, elem, rowCtrl, rowNumber)
        return this.component.initControl(form, elem, rowCtrl, rowNumber)
    }

    ctrl.updateCtrl = function(what, row, col, mustUpdate) {
        this.component.updateCtrl(what, row, col, mustUpdate)
    }

    ctrl.handleEvent = function(event) {
        let handled = this.component.handleEvent(event)
        if (handled !== null) {
            return handled
        }
        return this.superclass.handleEvent.call(this, event) //Let the superclass handle the event, if not handled here.
    }

    ctrl.getProperty = function(propNumber) {
        console.log("getProperty", propNumber)
        var result = this.component.getProperty(propNumber)
        if (result.handled) {
            return result.value
        } else {
            return this.superclass.getProperty.call(this, propNumber) // Let the superclass handle it,if not handled here.
        }
    }

    ctrl.getCanAssign = function(propNumber) {
        console.log("getCanAssign", propNumber)
        var result = this.component.getCanAssign(propNumber)
        if (result.handled) {
            return result.status
        } else {
            return this.superclass.getCanAssign.call(this, propNumber) // Let the superclass handle it,if not handled here.
        }
    }

    ctrl.setProperty = function(propNumber, propValue) {
        console.log("Set property", propNumber, propValue)
        var result = this.component.setProperty(propNumber, propValue)
        if (result.handled) {
            return result.status
        } else {
            return this.superclass.setProperty.call(this, propNumber, propValue) // Let the superclass handle it, if not handled here.
        }
    }

    ctrl.addClickHandlers = function(elem) {
        console.log("addClickHandlers")
        this.component.addClickHandlers(elem)
    }

    ctrl.sizeChanged = function() {
        this.superclass.sizeChanged()
        this.component.sizeChanged()
    }

    return ctrl
})()

function ctrl_net_omnis_fivestar() {
    this.init_class_inst() // initialize our class
}
