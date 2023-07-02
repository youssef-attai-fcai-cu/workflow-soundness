class Place {
  constructor(tokens) {
    this.tokens = tokens;
  }
}

class InputArc {
  constructor(place) {
    this.place = place;
  }

  trigger() {
    this.place.tokens--;
  }

  hasNoTokens() {
    return this.place.tokens == 0;
  }
}

class OutputArc {
  constructor(place) {
    this.place = place;
  }

  trigger() {
    this.place.tokens++;
  }
}

class Transition {
  constructor(inputs, outputs) {
    this.inputs = inputs;
    this.outputs = outputs;
  }

  fire() {
    if (this.isBlocked()) {
      return false;
    }

    this.inputs.forEach((input) => input.trigger());
    this.outputs.forEach((output) => output.trigger());

    return true;
  }

  isBlocked() {
    return this.inputs.some((input) => input.hasNoTokens());
  }
}

class PetriNet {
  constructor(places, transitions) {
    this.places = places;
    this.transitions = transitions;
    this.allowedTransitions = {};
    this.firedTransitions = [];
    this.reachabilityGraph = [];
    this.soundness = true;
  }

  run() {}
}

const places = {
  i: new Place(1),
  p1: new Place(0),
  p2: new Place(0),
  p3: new Place(0),
  p4: new Place(0),
  o: new Place(0),
};

const transitions = {
  t1: new Transition(
    [new InputArc(places.i)],
    [new OutputArc(places.p1), new OutputArc(places.p2)]
  ),
  t2: new Transition([new InputArc(places.p1)], [new OutputArc(places.p3)]),
  t3: new Transition([new InputArc(places.p2)], [new OutputArc(places.p4)]),
  t4: new Transition(
    [new InputArc(places.p3), new InputArc(places.p4)],
    [new OutputArc(places.o)]
  ),
};

const petriNet = new PetriNet(places, transitions);
petriNet.run();
