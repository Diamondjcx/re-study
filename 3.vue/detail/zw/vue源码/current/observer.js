// 有没有6:30起来的？
class Subject {
    attach (obs) {
        this.deps.push(obs);
    }

    setState(num) {
        this.state = num
        this.notifyAllObservers();
    }
    notifyAllObservers () {
        this.deps.forEach(obs => obs.update(this.state))
    }
}

class Observer {
    constructor(subject) {
        this.subject = subject;
        this.subject.attach(this);
    }
    update() {

    }
}