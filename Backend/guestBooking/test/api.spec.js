let chaiHttp = require('chai-http');
let server= require('../routes/guest');
let chai = require('chai');
chai.use(chaiHttp);

describe('guestBooking',()=>{

    /**
     * Test the GET route
     */
    describe('GET /guest/guest',()=>{
        it('should get the guest details',(done)=>{
            chai.request(server)
            .get("/guest/guest")
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
        })

        describe('GET /guest/guest',()=>{
            it('should not get the guest details',(done)=>{
                chai.request(server)
                .get("/guest/guest")
                .end((err, res)=>{
                    res.should.have.status(404);
                    done();
                })
            })
    })
    
})

        /**
         * Test the GET by ID route
         */

         describe('GET /guest/guest/:id',()=>{
            it('should get a guest details by ID',(done)=>{
                const guestID= "60bf22ea23e13c7f559e3074";
                chai.request(server)
                .get("/guest/guest/:id"+guestID)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Code');
                    res.body.should.have.property('guest_name');
                    res.body.should.have.property('phone_no');
                    res.body.should.have.property('age');
                    res.body.should.have.property('gender');
                    res.body.should.have.property('email');
                    res.body.should.have.property('address');
                    res.body.should.have.property('company');
                    res.body.should.have.property('room');
                    res.body.should.have.property('adults');
                    res.body.should.have.property('children');
                    res.body.should.have.property('checkin');
                    res.body.should.have.property('checkout');
                    res.body.should.have.property('id').eq(1);
                    done();
                })
            })

            it('should not get a guest details by ID',(done)=>{
                const guestID= "60bf22ea";
                chai.request(server)
                .get("/guest/guest/:id"+guestID)
                .end((err, res)=>{
                    res.should.have.status(404);
                    res.text.should.be.eq('The guest details of the given ID does not exist');
                    done();
                })
         })

        })

})