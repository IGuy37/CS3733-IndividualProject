
export function adjust(model, delta){
    if(!model.available(delta)){
        return model; //return original model if you can't adjust it
    }

    model.adjust(delta);
    return model.copy();
}