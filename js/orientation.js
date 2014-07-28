/*!
 * Normalizing the accelerometer and gyro in 3d space
 *
 * @author Blake Kus <http://blakek.us>
 * @copyright Blake Kus <http://blakek.us>
 * @version 0.0.1
 * @license MIT License
 */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like enviroments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.deviceOrientation = factory();
	}
}(this, function () {
	/**
	 * @private variables
	 */
	var _listeners = [],
		_iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
		_Android = /Android/i.test(navigator.userAgent),
		_aOffset = null,
		_aOffsetWarm = 0,
		_raw = {},
		_original = {},
		_a = null,
		_x = null,
		_y = null,
		_z = null,
		_lastDispatch = null,
		_originalOrientation = null,
		_orientation = null,
		_gravity = 9.78;

	/**
	 * @private methods
	 */
	var _setup = function() {
		if (window && window.addEventListener) {
			if (typeof window.orientation != 'undefined') {
				if (_originalOrientation == null) {
					_originalOrientation = window.orientation;
				}
				_orientation = window.orientation;
				window.addEventListener('orientationchange', function(e) {
					_orientation = window.orientation;
					_aOffset = null;
					_aOffsetWarm = 0;
					_dispatch();
				}, false);
			}
			if (window.DeviceOrientationEvent) {
				window.addEventListener('deviceorientation', function(e) {
					if (_aOffset == null) {
						_aOffsetWarm++;
						// Some Android devices took a couple events to get the correct alpha
						if (_aOffsetWarm > 4) {
							_aOffset = e.alpha;
						}
					}
					_a = e.alpha - _aOffset;
					_raw.a = e.alpha;
					_original.a = _a;
					if (_Android) {
						// Android
						switch (true) {
							case _originalOrientation == 0 && _orientation == 0:
							case _originalOrientation == 90 && _orientation == 0:
							case _originalOrientation == -90 && _orientation == 0:
								if (_a > 180) {
									_a = (360 - _a) * -1;
								}
							break;
							case _originalOrientation == 0 && _orientation == -90:
							case _originalOrientation == 90 && _orientation == -90:
							case _originalOrientation == -90 && _orientation == -90:
								_a *= -1;
							break;
							case _originalOrientation == 0 && _orientation == 90:
							case _originalOrientation == 90 && _orientation == 90:
							case _originalOrientation == -90 && _orientation == 90:
								if (_a < 0) {
									_a = Math.abs(_a);
								} else if (_a > 180) {
									_a = (360 - _a);
								} else {
									_a *= -1;
								}
							break;
						}
					} else {
						// iOS and other devices
						switch (true) {
							case _originalOrientation == 0 && _orientation == 90:
							case _originalOrientation == 0 && _orientation == -90:
							case _originalOrientation == 90 && _orientation == 0:
							case _originalOrientation == 90 && _orientation == -90:
							case _originalOrientation == -90 && _orientation == 90:
								_a *= -1;
							break;
							case _originalOrientation == 0 && _orientation == 0:
							case _originalOrientation == 90 && _orientation == 90:
								if (_a < -180) {
									_a = (360 + _a) * -1;
								} else if (_a < 0) {
									_a *= -1;
								}
							break;
							case _originalOrientation == -90 && _orientation == -90:
								if (_a > 180) {
									_a = (360 - _a);
								} else {
									_a *= -1;
								}
							break;
							case _originalOrientation == -90 && _orientation == 0:
								if (_a < 0) {
									_a = Math.abs(_a);
								} else if (_a > 180) {
									_a = (360 - _a);
								} else {
									_a *= -1;
								}
							break;
						}
					}
					// Catch all
					if (_a > 180) {
						_a = (360 - _a);
					} else if (_a < -180) {
						_a = (360 + _a) * -1;
					}
					_dispatch();
				}, false);
			}
			if (window.DeviceMotionEvent) {
				window.addEventListener('devicemotion', function(e) {
					if (e.accelerationIncludingGravity && typeof e.accelerationIncludingGravity == 'object' && e.accelerationIncludingGravity.x != null) {
						_x = e.accelerationIncludingGravity.x;
						_y = e.accelerationIncludingGravity.y;
						_z = e.accelerationIncludingGravity.z;
						_raw.x = _x;
						_raw.y = _y;
						_raw.z = _z;
						_dispatch();
					}
				}, false);
			}
		}
	};
	var _dispatch = function() {
		if (_listeners.length > 0) {
			var data = {
				orientation: _orientation,
				z: (_x * (90 / _gravity)).toFixed(0) * -1,
				y: _a.toFixed(0),
				x: (_z * (90 / _gravity)).toFixed(0),
				original: _original,
				raw: _raw
			};
			if (_orientation != 0) {
				data.z = (_y * (90 / _gravity)).toFixed(0);
			}
			// iOS devices
			if (_iOS) {
				data.z *= -1;
				data.x *= -1;
			}
			if (_orientation < 0) {
				data.z *= -1;
			}
			for (var i in _listeners) {
				_listeners[i](data);
			}
		}
	};

	// Initialize
	_setup();

	/**
	 * @public
	 */
	var module = {};
	module.onUpdate = function(cb) {
		_listeners.push(cb);
	};
	return module;
}));