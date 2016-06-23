var PS = require( '../index' );
var CP = require( 'child_process' );
var assert = require( 'assert' );
var Path = require( 'path' );

var serverPath = Path.resolve( __dirname, './node_PROCESS_for_test.js' );
var child = CP.fork( serverPath );
var pid = child.pid;

describe('test', function(){

    describe( '#lookup()', function(){

        it( 'by id', function( done ){
            PS.lookup({ pid: String( pid ) }, function( err, list ){
                assert.equal( list.length, 1 );
                assert.equal( list[0].arguments[0], serverPath );

                done();
            });
        });

        it( 'by command & arguments', function( done ){
            PS.lookup({ command: '.*(node|iojs).*', arguments: 'node_PROCESS_for_test' }, function( err, list ){
                assert.equal( list.length, 1 );
                assert.equal( list[0].pid, pid );
                assert.equal( list[0].arguments[0], serverPath );
                done();
            });
        });

        it( 'by arguments, the matching should be case insensitive ', function( done ){
            PS.lookup({ arguments: 'node_process_for_test' }, function( err, list ){
                assert.equal( list.length, 1 );
                assert.equal( list[0].pid, pid );
                assert.equal( list[0].arguments[0], serverPath );
                done();
            });
        });

        it( 'empty result list should be safe ', function( done ){
            PS.lookup({ command: 'NOT_EXIST', psargs: 'l' }, function( err, list ){
                assert.equal( list.length, 0 );
                done();
            });
        });
    });

    describe( '#kill()', function(){

        it( 'kill', function( done ){

            PS.kill( pid, function( err ){
                assert.equal( err, null );
                PS.lookup( { pid: String( pid ) }, function( err, list ){
                    assert.equal( list.length, 0 );
                    done();
                });
            });
        });
    });
});