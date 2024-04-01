"use strict";

import {Stud, FrStd} from "./exercise3.mjs";
import {writeFileSync, readFileSync } from 'fs';

class Prmtn {
    constructor() {
        this.students = [];
    }

    add(student) {
        this.students.push(student);
    }

    size() {
        return this.students.length;
    }

    get(i) {
        return this.students[i];
    }

    print() {
        for (const student of this.students) {
            console.log(student.toString());
        }
        return '';
    }

    write() {
        return JSON.stringify(this.students);
    }

    read(str) {
        this.students = JSON.parse(str).map(studentData => {
            if ('nationality' in studentData) {
                return new FrStd(studentData.lastName, studentData.firstName, studentData.id, studentData.nationality);
            } else {
                return new Stud(studentData.lastName, studentData.firstName, studentData.id);
            }
        });
    }

    saveTo(fileName) {
        const jsonStr = this.write();
        writeFileSync(fileName, jsonStr);
    }

    readFrom(fileName) {
        const jsonStr = readFileSync(fileName, 'utf-8');
        this.read(jsonStr);
    }
}

export { Prmtn };
