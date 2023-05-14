// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title TaskTurtle
 */
contract TaskTurtle {


    struct Job{
        uint64 id;
        address poster;
        address worker;
        uint64 amount;
        uint8 state;
    }

    Job[] public jobs;

    uint64 currentId = 0;

    event jobCreated (uint64 id);
    event jobAccepted(uint64 id);
    event jobCanceled(uint64 id);
    event jobAbandoned(uint64 id);
    event jobCompleted(uint64 id);
    event jobPayed(uint64 id);

    function createJob(uint64 _amount) public returns (uint){
        currentId++;

        jobs.push(Job(currentId, msg.sender, address(0),_amount,0));

        emit jobCreated(currentId);
        return currentId;
    }

    function acceptJob(uint64 idJob) public {
        require(jobs[idJob].id != 0, "Ce travail n'existe pas");

        Job storage j = jobs[idJob];

        require(j.state == 0, "Le travail a deja ete accepte.");

        j.worker = msg.sender;
        j.state = 1;
        
        emit jobAccepted(j.id);
    }

    function cancelJob(uint64 idJob) public {
        require(jobs[idJob].id != 0, "Ce travail n'existe pas");
        Job storage j = jobs[idJob];
        require(j.state <= 2, "Le travail est deja fini.");
        require(j.poster == msg.sender,"C'est la personne qui a poste le travail qui peut l'annuler.");

        j.state = 6;
    }

    function abandonJob(uint64 idJob) public {
        require(jobs[idJob].id != 0, "Ce travail n'existe pas");
        Job storage j = jobs[idJob];
        require(j.state == 2, "Le travail a deja ete accepte.");
        require(j.worker == msg.sender,"C'est la personne qui a accepte le travail qui peut l'abandonner");

        j.state = 0;
        j.worker = address(0);

        emit jobAbandoned(j.id);
    }

    function completeJob(uint64 idJob) public {
        require(jobs[idJob].id != 0, "Ce travail n'existe pas");
        Job storage j = jobs[idJob];
        require(j.state == 1, "Le travail a deja ete accepte.");
        require(j.worker == msg.sender,"C'est la personne qui a accepte le travail qui doit le signaler comme completer");

        j.state = 2;

        emit jobCompleted(j.id);
    }

    function payJob(uint64 idJob) public {
        require(jobs[idJob].id != 0, "Ce travail n'existe pas");
        Job storage j = jobs[idJob];
        require(j.state >= 2, "Le travail n'est pas encore fini.");
        require(j.state <= 2, "Le travail a deja ete paye");
        require(j.poster == msg.sender,"C'est la personne qui a poste le travail qui le paye.");

        j.state = 3;

        //Payement

        emit jobPayed(j.id);
    }
}