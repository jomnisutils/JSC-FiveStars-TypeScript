import { JSONComponent } from "./omnis"

enum FiveStarsProperties {
    maxrating = "$maxrating",
    currentrating = "$currentrating",
}
declare type FiveStartDataProps = {
    maxrating: number
    currentrating: number
}

export class FiveStarsJSONComponent extends JSONComponent {
    private mDefaultText: string = "EMPTY"
    private mmaxrating: number = 0
    private mcurrentrating: number = 0
    private ratingObj?: any
    private mText: string = ""
    private mData: any // $dataname dell'oggetto

    constructor(base: ctrl_base) {
        super(base)
        // initialize class specific stuff
        this.mDefaultText = "EMPTY"
        this.mmaxrating = 0
        this.mcurrentrating = 0
    }

    protected render(): HTMLElement {
        const elem = document.createElement("div")
        elem.classList.add("fiveStars__img")
        const ul = document.createElement("ul")
        ul.classList.add("c-rating")
        elem.appendChild(ul)

        this.addClickHandlers(elem)
        return elem
    }

    protected setDataProps(dataProps: FiveStartDataProps) {
        const { maxrating, currentrating } = dataProps
        const client_elem = this.base.getClientElem()
        var rating_elem = client_elem.querySelector(".c-rating") as HTMLElement

        this.ratingObj = rating(rating_elem, 0, maxrating)
        this.setProperty(FiveStarsProperties.maxrating, maxrating)
        this.setProperty(FiveStarsProperties.currentrating, currentrating)
    }

    public handleClick(pX: number, pY: number) {
        console.log("handle click")
        if (this.base.canSendEvent(eBaseEvent.evClick)) {
            this.base.eventParamsAdd("pXPos", pX)
            this.base.eventParamsAdd("pYPos", pY)
            // add these lines to the javascript generated from the JSON editor
            let numStars = this.ratingObj.getRating() //get the selected number of stars from control
            this.base.eventParamsAdd("pNumStart", numStars) //send this to Omnis, match the Omnis event parameter name

            this.base.sendEvent(eBaseEvent.evClick)
        }
        return true
    }

    /**
     * Function to get $canassign for a property of an object
     * @param prop    The Omnis property number
     * @returns   Whether the passed property can be assigned to.
     */
    public getCanAssign(prop: OmnisPropName) {
        let handled,
            status = false
        switch (prop) {
            case eBaseProperties.text:
            case FiveStarsProperties.maxrating:
            case FiveStarsProperties.currentrating:
                handled = true
                status = true
                break
            default:
                handled = false
        }
        return { handled, status }
    }

    public setProperty(prop: OmnisPropName, value: any) {
        if (!this.getCanAssign(prop)) {
            // check whether the value can be assigned to
            return { handled: true, status: false }
        }
        let handled = true
        switch (prop) {
            case eBaseProperties.text: // Set the text as appropriate for this control.
                this.mText = value
                var client_elem = this.base.getClientElem()
                client_elem.innerHTML = value
                break
            case FiveStarsProperties.maxrating:
                this.mmaxrating = value
                break
            case FiveStarsProperties.currentrating:
                this.mcurrentrating = value
                // add this line to the javascript generated from the JSON editor
                this.ratingObj.setRating(this.mcurrentrating) //update the number of stars displayed
                break
            default:
                handled = false
        }
        return { handled, status: true }
    }
    /**
     * Called to get the value of an Omnis property
     *
     * @param prop    The Omnis property number
     * @returns {var}       The property's value
     */
    public getProperty(prop: OmnisPropName) {
        let handled = true
        let value: any = null
        switch (prop) {
            case eBaseProperties.text:
                value = this.mText
                break
            case FiveStarsProperties.maxrating:
                value = this.mmaxrating
                break
            case FiveStarsProperties.currentrating:
                value = this.mcurrentrating
                break
            default:
                handled = false
        }
        return {
            handled,
            value,
        }
    }

    public updateCtrl(what: "" | "#COL" | "#LSEL" | "#L" | "#LSEL_ALL" | "#NCELL", row: number, col: number | string): void {
        const elem = this.base.getClientElem()

        // center the text vertically:
        elem.style.lineHeight = elem.style.height
        elem.style.textAlign = "center"

        // read $dataname value and display in control
        const dataname = this.base.getData()
        if (this.mData != dataname) {
            // only execute the following code if the value of the $dataname variable has changed.
            this.mData = dataname
            // update these lines to the javascript generated from the JSON editor
            if (dataname || dataname == 0) {
                // if value of dataname is 0
                //      elem.innerHTML = this.mData;    // do not show dataname value else it blats over the stars
            } else {
                elem.innerHTML = this.mDefaultText
            }
        }
    }

    public sizeChanged() {
        // center any text vertically
        const elem = this.base.getClientElem()
        elem.style.lineHeight = elem.style.height
    }
}
